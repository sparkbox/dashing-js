var glob = require("glob"),
    path = require('path'),
    fs = require("fs");

var dir = "./tmp",
    fullPath = path.join(dir, "history.json");

function loadFromTmpDir() {
  if( !fs.existsSync(fullPath) ) {
    return {}
  }

  var data = fs.readFileSync(fullPath);

  console.log("Reading history from " + fullPath);
  console.log(data);

  return JSON.parse(data);
};

function persistToTmpDir(data) {
  var data = JSON.stringify(data);

  console.log("Writing history to " + fullPath);
  console.log(data);

  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(fullPath, data);
}

module.exports = {
  remember: loadFromTmpDir,
  persist: persistToTmpDir
};
