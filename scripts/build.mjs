import { build } from "esbuild";
import { Command } from "commander";

const program = new Command();
program
  .option("-p", "production mode", false)
  .option("-w", "watch mode", false);
program.parse(process.argv);
const { p, w } = program.opts();

const external = ["electron"];

if (!p) {
  external.push("electron-reload");
}

build({
  entryPoints: ["src/main/main.ts", "src/main/preload.ts"],
  platform: "node",
  external,
  bundle: true,
  minify: p,
  sourcemap: !p,
  outdir: "dist/main",
  loader: {
    ".node": "file",
  },
  define: {
    "process.env.NODE_ENV": p ? "'production'" : "'development'",
  },
  watch: w
    ? {
        onRebuild(error, result) {
          if (error) console.error("watch build failed:", error);
          else console.log("watch build succeeded:", result);
        },
      }
    : false,
}).then((result) => {
  console.log(w ? "watching..." : "done😎");
});
