import pkg from "./package.json" with { type: "json" };

export default {
  appId: "com.konbu310.hyper-launcher",
  asar: true,
  asarUnpack: ["node_modules/file-icon/**"],
  productName: "Hyper Launcher",
  directories: {
    output: `release/${pkg.version}`,
  },
  files: ["dist", "!dist/assets/*.map", "dist-electron"],
  mac: {
    target: ["default"],
    icon: "public/icons/macos/icon.icns",
    category: "public.app-category.productivity",
    identity: null,
    publish: null,
  },
};
