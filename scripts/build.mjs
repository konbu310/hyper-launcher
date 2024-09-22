import esbuild from "esbuild";
import { program } from "commander";
import fs from "node:fs/promises";

program
  .option("--prd", "production mode", false)
  .option("--watch", "watch mode", false)
  .option("--metafile", "gen metafile", false);

program.parse(process.argv);
const { prd, watch, metafile } = program.opts();

const binaryPath = "GetAppIcon/.build/apple/Products/Release/GetAppIcon";

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
  await fs.mkdir("dist/main", { recursive: true });
  await fs.copyFile(binaryPath, "dist/main/GetAppIcon");
}

try {
  const stat = await fs.stat(binaryPath);
  if (!stat.isFile()) {
    console.error("GetAppIcon not found");
    process.exit(1);
  }

  await copyBinaries();
  if (watch) {
    const ctx = await esbuild.context({ ...option });
    await ctx.watch();
  } else {
    const result = await esbuild.build({ ...option, metafile });
    if (metafile) {
      await fs.writeFile("meta.json", JSON.stringify(result.metafile));
    }
  }
  process.exit(0);
} catch (e) {
  console.error(e);
  process.exit(1);
}
