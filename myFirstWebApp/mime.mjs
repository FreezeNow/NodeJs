import path from 'path';

const mimeTypes = {
  css: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  png: 'image/png',
  jpeg: 'image/jpeg',
  txt: 'text/plain',
  js: 'application/javascript',
};

const lookup = function (pathName) {
  let ext = path.extname(pathName);
  ext = ext.split('.').pop();
  return mimeTypes[ext] || mimeTypes.txt;
};

export default {
  lookup,
};
