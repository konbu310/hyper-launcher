import esbuild from "esbuild";
import { program } from "commander";
import fs from "node:fs/promises";
import { nodeExternalsPlugin } from "esbuild-node-externals";

program
  .option("--prd", "production mode", false)
  .option("-w", "watch mode", false)
  .option("--metafile", "gen metafile", false);

program.parse(process.argv);
const { prd, w, metafile } = program.opts();

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
  format: "esm",
  plugins: [nodeExternalsPlugin()],
  banner: {
    js: `
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
`,
  },
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
  if (w) {
    const ctx = await esbuild.context({ ...option });
    await ctx.watch();
  } else {
    const result = await esbuild.build({ ...option, metafile });
    if (metafile) {
      await fs.writeFile("meta.json", JSON.stringify(result.metafile));
    }
  }
} catch (e) {
  console.error(e);
  process.exit(1);
}
