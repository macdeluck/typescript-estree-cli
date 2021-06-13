const argv = process.argv.slice(2);
const fs = require('fs')

const renameCallback = function (err) {
  if (err) {
    console.log(err);
  }
}

fs.rename(argv[0], argv[1], renameCallback);