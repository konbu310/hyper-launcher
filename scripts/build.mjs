import esbuild from "esbuild";
import { program } from "commander";
import fs from "fs-extra";

program
  .option("--prd", "production mode", false)
  .option("--watch", "watch mode", false)
  .option("--metafile", "gen metafile", false);

program.parse(process.argv);
const { prd, watch, metafile } = program.opts();

const binaryPath = "GetAppIcon/.build/apple/Products/Release/GetAppIcon";

if (!fs.existsSync(binaryPath)) {
  console.error("GetAppIcon not found");
  process.exit(1);
}

const external = ["electron"];

if (!prd) {
  external.push("electron-reload");
}

const nodeEnv = prd ? "production" : "development";

const option = {
  entryPoints: ["src/main/main.ts", "src/main/preload.ts"],
  platform: "node",
  external,
  bundle: true,
  minify: prd,
  sourcemap: prd ? "external" : "inline",
  treeShaking: true,
  outdir: "dist/main",
  loader: {
    ".node": "file",
  },
  define: {
    "process.env.NODE_ENV": `"${nodeEnv}"`,
  },
  logLevel: "info",
  color: true,
};

async function copyBinaries() {
  await fs.copy(binaryPath, "dist/main/GetAppIcon");
}

try {
  await copyBinaries();
  if (watch) {
    const ctx = await esbuild.context({ ...option });
    await ctx.watch();
  } else {
    const result = await esbuild.build({ ...option, metafile });
    if (metafile) {
      await fs.outputFile("meta.json", JSON.stringify(result.metafile));
    }
  }
  process.exit(0);
} catch (e) {
  console.error(e);
  process.exit(1);
}
