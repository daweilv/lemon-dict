const path = require('path');

const appDirectory = process.cwd();
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('dist'),
  appHtml: resolveApp('public/index.html'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
};
