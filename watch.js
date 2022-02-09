const { watch } = require('chokidar')
const { exec } = require('child_process')

setWatcher('./contracts', 'npx hardhat compile')

function setWatcher (watchedDir, cmd) {
  console.log('[Start watch]:', ...arguments)
  let isBlock = true
  const useCmd = (filename) => {
    console.log(`${filename} file was Changed recompile...`)
    exec(cmd, (_error, stdout) => { console.log(`${stdout}\n\x1b[32mDone`, '\x1b[0m') })
  }
  watch(watchedDir).on('all', (_event, filename) => filename && !isBlock && useCmd(filename))
  setTimeout(() => (isBlock = false, useCmd('[force precompile]')), 1000)
}