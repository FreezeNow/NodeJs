'use strict';

const 
    http = require('http'),
    url = require('url'),
    path = require('path');

function start(file) {
    function onRequest(request, response) {
        // 获取根目录
        var root = path.resolve(process.argv[2] || '.');
        var pathname = url.parse(request.url).pathname;
        if (pathname == '/') {
            pathname = '/index.html';
        }
        // 如果没有html目录，则添加
        if (pathname.indexOf('/html') === -1) {
            pathname = path.join(root + ('/html' + pathname));
        } else {
            pathname = path.join(root + pathname);
        }

        file.isFile(file, pathname,response);
        
        // route(file, pathname, response);
    }
    http.createServer(onRequest).listen(8080);
    console.log('服务器启动,端口为8080');
}

exports.start = start;