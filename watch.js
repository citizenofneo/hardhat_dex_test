const chokidar = require("chokidar");
const { exec } = require("child_process");

setWatcher("./contracts", "npx hardhat compile");

function setWatcher(watchedDir, cmd) {
  console.log("[Start watch]:", ...arguments);
  const useCmd = (filename) => {
    console.log(`${filename} file was Changed`);
    exec(cmd, (_error, stdout) => console.log(`stdout:\n${stdout}`));
  };
  chokidar
    .watch(watchedDir)
    .on("all", (event, filename) => filename && useCmd(filename));
  useCmd("pre");
}
