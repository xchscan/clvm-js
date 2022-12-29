const path = require("path");
const fs = require("fs");

// clean and create output dir
const distDir = path.join(__dirname, ".dist");
if(fs.existsSync(distDir)){
  fs.rmSync(distDir, {recursive: true});
}
fs.mkdirSync(distDir);
const distNpmDir = path.join(distDir, "npm");
fs.mkdirSync(distNpmDir);

// Copy wasm file
const browserDir = path.join(distNpmDir, "browser");
if(fs.existsSync(browserDir)){
  fs.rmSync(browserDir, {recursive: true});
}
fs.mkdirSync(browserDir);
const blsWasmSrcPath = path.join(__dirname, "node_modules", "bls-signatures", "blsjs.wasm");
const blsWasmDestPath = path.join(browserDir, "blsjs.wasm");
if(!fs.existsSync(blsWasmSrcPath)){
  console.error("blsjs.wasm not found at:");
  console.error(blsWasmSrcPath);
  console.error("Probably you haven't execute npm install yet");
  return;
}
fs.copyFileSync(blsWasmSrcPath, blsWasmDestPath);
const browserDtsPath = path.join(browserDir, "index.d.ts");
fs.writeFileSync(browserDtsPath, 'export * from "..";\n');


const packageJson = require("./package.json");

function mapTree(cb, node, path=[]) {
  if (Array.isArray(node)) {
    return node.map((leaf, branch) => mapTree(cb, leaf, [...path, branch]));
  } else if (node && typeof node === "object") {
    const newNode = {};
    for (const [branch, leaf] of Object.entries(node)) {
      newNode[branch] = mapTree(cb, leaf, [...path, branch]);
    }
    return newNode;
  }
  return cb(path, node);
}

const localPublishDir = './.dist/npm';
const regexp = new RegExp(`^${localPublishDir.replace(/\./g, '\\.')}`)
const localizedPathsPackageJson = mapTree((_path, val) => {
  if (typeof val === "string" && regexp.test(val)) {
    return val.replace(regexp, '.');
  }
  return val;
}, packageJson);

fs.writeFileSync(path.join(distNpmDir, "package.json"), JSON.stringify(localizedPathsPackageJson, null, 2));

function copyFileToPublish(fileName){
  const srcPath = path.join(__dirname, fileName);
  const distPath = path.join(distNpmDir, fileName);
  if(fs.existsSync(srcPath)){
    fs.copyFileSync(srcPath, distPath);
  }
}

copyFileToPublish("CHANGELOG.md");
copyFileToPublish("LICENSE");
copyFileToPublish("README.md");
