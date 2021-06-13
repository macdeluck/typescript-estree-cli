const argv = process.argv.slice(2);
const zl = require("zip-lib");
const fs = require("fs");

const isDirectory = function (path) {
  return fs.lstatSync(path).isDirectory();
}

if (isDirectory(argv[0])) {
  zl.archiveFolder(argv[0], argv[1]);
} else {
  zl.archiveFile(argv[0], argv[1]);
}