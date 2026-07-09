import esbuild from "esbuild";
import fs from "node:fs/promises";
import { parseArgs } from "node:util";
import { nodeExternalsPlugin } from "esbuild-node-externals";

const {
  values: { prd = false, w = false, metafile = false },
} = parseArgs({
  args: process.argv.slice(2),
  options: {
    prd: {
      type: "boolean",
    },
    w: {
      type: "boolean",
      short: "w",
    },
    metafile: {
      type: "boolean",
    },
  },
});

const fileIconBinaryPath = "node_modules/file-icon/file-icon";

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
  plugins: [nodeExternalsPlugin({ allowList: ["file-icon"] })],
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
  await fs.copyFile(fileIconBinaryPath, "dist/main/file-icon");
  await fs.chmod("dist/main/file-icon", 0o755);
}

try {
  const stat = await fs.stat(fileIconBinaryPath);
  if (!stat.isFile()) {
    console.error("file-icon binary not found");
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
