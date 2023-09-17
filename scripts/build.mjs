import esbuild from "esbuild";
import { Command } from "commander";

const program = new Command();
program
  .option("--prd", "production mode", false)
  .option("--watch", "watch mode", false)
  .option("--metafile", "gen metafile", false);
program.parse(process.argv);
const { prd, watch, metafile } = program.opts();

const external = ["electron"];

if (!prd) {
  external.push("electron-reload");
}

const nodeEnv = prd ? "production" : "development";

(async () => {
  const option = {
    entryPoints: ["src/main/main.ts", "src/main/preload.ts"],
    platform: "node",
    external,
    bundle: true,
    minify: prd,
    sourcemap: !prd,
    outdir: "dist/main",
    loader: {
      ".node": "file",
    },
    define: {
      "process.env.NODE_ENV": `"${nodeEnv}"`,
    }
  };
  try {
    if (watch) {
      const ctx = await esbuild.context({ ...option });
      await ctx.watch();
    } else {
      const result = await esbuild.build({ ...option, metafile });
      if (metafile) {
        await fs.writeFile("meta.json", JSON.stringify(result.metafile));
      }
    }
    return 0;
  } catch (e) {
    return 1;
  }
})();
