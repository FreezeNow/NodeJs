'use strict';

const fs = require('fs');

function readFile(pathname, response) {
    // console.log(1);
    fs.readFile(pathname, function (err, data) {
        if (err) {
            throw err;
        }

        response.write(data);
        response.end();
    });
}
function isFile(file, pathname, response) {
    fs.stat(pathname, (err, stats) => {
        if (err) {
            throw err;
        } else {
            if (stats.isFile()) {
                console.log(true);
                var tempLast = pathname.substr(pathname.indexOf('.'));
                console.log(tempLast);
                
                response.writeHead(200, {'Content-Type': `text/${tempLast}`});

                file.readFile(pathname, response);

            } else {
                console.log(false);
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.write('<h1>404 Not Found</h1>');
                response.end();
                return false;
            }
        }
    })
}

exports.readFile = readFile;
exports.isFile = isFile;