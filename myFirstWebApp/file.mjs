import fs from 'fs';
import mime from './mime';

const readFile = function (pathname, response) {
  const readStream = fs.createReadStream(pathname);
  readStream.pipe(response);
}
const notFoundFile = function (pathname, response) {
  let tempPathname = pathname;
  tempPathname = tempPathname.substr(tempPathname.indexOf('html') + 5);
  tempPathname = tempPathname.split('\\');
  tempPathname = tempPathname.join('/');
  tempPathname = `http://localhost:8080/${tempPathname}`;
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(
    `<h1>404 Not Found</h1>
    <p>${tempPathname} is not a right url</p>`,
  );
  response.end();
}
const isFile = function (file, pathname, request, response) {
  fs.stat(pathname, (err, stats) => {
    if (err) {
      file.notFoundFile(pathname, response);
    } else if (stats.isFile()) {
      const tempLast = mime.lookup(pathname);
      response.setHeader('Content-Type', `${tempLast}; charset=utf8`);
      response.writeHead(200);
      file.readFile(pathname, response);
    }
  });
}
const writeFile = function (pathname, txt, response) {
  fs.writeFile(pathname, JSON.stringify(txt), 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      response.end(txt);
    }
  });
}

export default {
  readFile,
  writeFile,
  isFile,
  notFoundFile,
};
