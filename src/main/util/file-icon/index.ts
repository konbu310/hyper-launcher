import path from "path";
import util from "util";
import { execFile } from "child_process";

type Options = {
  size: number;
};

type File = string | number;

const execFileP = util.promisify(execFile);
const bin = path.join(__dirname, "bin/file-icon");
const HUNDRED_MEGABYTES = 1024 * 1024 * 100;

const spawnOptions = {
  encoding: null,
  maxBuffer: HUNDRED_MEGABYTES
};

const validate = (file: File, options: Options) => {
  options = {
    size: 1024,
    ...options
  };

  if (process.platform !== "darwin") {
    throw new Error("macOS only");
  }

  if (!file) {
    throw new Error("Specify an app name, bundle identifier, or file path");
  }

  if (typeof options.size !== "number") {
    options.size = 1024;
  }

  if (options.size > 1024) {
    throw new Error("Size must be 1024 or less");
  }

  return options;
};

const buffer = async (file: File, options: Options) => {
  options = validate(file, options);

  const isPid = typeof file === "number";

  const { stdout } = await execFileP(
    bin,
    [String(file), String(options.size), String(isPid)],
    spawnOptions
  );

  return stdout;
};

export const fileIcon = {
  buffer
};
