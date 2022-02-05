import { watch } from "chokidar";
import { exec } from "child_process";

setWatcher("./contracts", "npx hardhat compile");

function setWatcher(watchedDir, cmd) {
  console.log("[Start watch]:", ...arguments);
  const useCmd = (filename) => {
    console.log(`${filename} file was Changed`);
    exec(cmd, (_error, stdout) => console.log(`stdout:\n${stdout}`));
  };
  watch(watchedDir).on(
    "all",
    (event, filename) => filename && useCmd(filename)
  );
  useCmd("pre");
}
