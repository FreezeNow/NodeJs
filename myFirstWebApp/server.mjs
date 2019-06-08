import http from 'http';
import url from 'url';
import path from 'path';
import WebSocket from 'ws';
import mysql from './mysql';
import ajax from './ajax';
import verify from './verify';

const start = function (file) {
  const onRequest = function (request, response) {

    const { loginVerification, ajaxUser, hasName, ajaxRegister, ajaxReceieChest, ajaxGetBlogs, ajaxPublishBlog, ajaxSearchUser } = mysql;
    const { getVerify } = verify;
    const ajaxUrls = {
      loginVerification,
      ajaxUser,
      hasName,
      ajaxRegister,
      getVerify,
      ajaxReceieChest,
      ajaxGetBlogs,
      ajaxPublishBlog,
      ajaxSearchUser,
    };

    // 获取根目录
    const root = path.resolve(process.argv[2] || '.');
    let { pathname } = url.parse(request.url);

    const tempPathname = pathname.substring(pathname.lastIndexOf('/') + 1);
    // console.log(tempPathname);
    if (ajaxUrls[tempPathname]) {
      if (tempPathname === 'getVerify') {
        ajaxUrls[tempPathname](response);
      } else {
        ajax.ajax(request, response, ajaxUrls[tempPathname]);
      }
    } else {
      if (pathname.indexOf('.ico') !== -1) {
        response.writeHead(404, { 'Content-Type': 'text/ico' });
        response.end();
      } else {
        if (pathname === '/') {
          pathname = '/index.html';
        }
        // 如果没有html目录，则添加
        if (pathname.indexOf('/html') === -1) {
          pathname = path.join(`${root}/html${pathname}`);
        } else {
          pathname = path.join(root + pathname);
        }
        // 不使用上传功能且按后缀名分类文件的话这样应该够用了吧
        // 为无后缀的请求添加后缀
        if (pathname.indexOf('.') === -1) {
          // 临时存储倒数第一个反斜杠的位置
          const tempCoordinate1 = pathname.lastIndexOf('\\');
          // 临时存储倒数第二个反斜杠的位置
          const tempCoordinate2 = pathname.lastIndexOf('\\', tempCoordinate1 - 1);
          // 临时存储后缀名
          const tempMime = pathname.substring(tempCoordinate2 + 1, tempCoordinate1);
          pathname = `${pathname}.${tempMime}`;
        }
        file.isFile(file, pathname, request, response);
      }

    }
    // if (pathname.indexOf('.ico') !== -1) {
    //   response.writeHead(404, { 'Content-Type': 'text/ico' });
    //   response.end();
    // } else if (pathname.endsWith('loginVerification')) {
    //   console.log('loginVerification');

    //   ajax.login(request, response, mysql.login);
    // } else if (pathname.endsWith('ajaxUser')) {
    //   console.log('ajaxUser');

    //   ajax.login(request, response, mysql.ajaxUser);
    // } else if (pathname.endsWith('hasName')) {
    //   console.log('hasName');

    //   ajax.hasName(request, response, mysql.hasName);
    // } else if (pathname.substring(pathname.lastIndexOf('/')+1) ==='ajaxRegister') {
    //   console.log('pathname:' + pathname);

    //   ajax.login(request, response, mysql.register);
    // } else if (pathname.endsWith('getVerify')) {
    //   console.log('getVerify');
    //   verify.getVerify(response);
    // } else {
    //   if (pathname.indexOf('.ico') !== -1) {
    //     response.writeHead(404, { 'Content-Type': 'text/ico' });
    //     response.end();
    //   }
    //   if (pathname === '/') {
    //     pathname = '/index.html';
    //   }
    //   // 如果没有html目录，则添加
    //   if (pathname.indexOf('/html') === -1) {
    //     pathname = path.join(`${root}/html${pathname}`);
    //   } else {
    //     pathname = path.join(root + pathname);
    //   }
    //   // 不使用上传功能且按后缀名分类文件的话这样应该够用了吧
    //   // 为无后缀的请求添加后缀
    //   if (pathname.indexOf('.') === -1) {
    //     // 临时存储倒数第一个反斜杠的位置
    //     const tempCoordinate1 = pathname.lastIndexOf('\\');
    //     // 临时存储倒数第二个反斜杠的位置
    //     const tempCoordinate2 = pathname.lastIndexOf('\\', tempCoordinate1 - 1);
    //     // 临时存储后缀名
    //     const tempMime = pathname.substring(tempCoordinate2 + 1, tempCoordinate1);
    //     pathname = `${pathname}.${tempMime}`;
    //   }
    //   file.isFile(file, pathname, request, response);
    // }
  }
  const server = http.createServer(onRequest);
  const wss = new WebSocket.Server({
    server,
    host: 'localhost',
    port: 3000,
  });
  let sockets = {};
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(data)
    });
  };
  wss.notice = function notice(id, data, ws) {
    // 向指定id发送
    try {
      console.log(`正在向${id}发送...`)
      let target = sockets[id]
      if (target) {
        // target.send('收到一条新消息')
        target.send(data)
      } else {
        ws.send(JSON.stringify({content: '目标信道已关闭'}));
      }
    } catch (err) {
      console.log(err)
    }
  }
  wss.on('connection', (ws, request) => {
    const url = request.url;
    const from = url.slice(url.indexOf('from') + 'from'.length + 1, url.indexOf('&'));
    const to = url.slice(url.indexOf('to') + 'to'.length + 1);
    sockets[from] = ws;
    console.log(`链接成功: ${from}`);


    ws.on('message', (data) => {
      // console.log(data);
      // wss.clients.forEach((client) => {
      //   // client.
      //   client.send(data);
      // });
      wss.notice(to, data, ws)
      // wss.clients.send(data);
    });
    ws.on('close', () => {
      ws.close();
      console.log('关闭成功');

    })
  });


  server.listen(8000);
  console.log('服务器启动,端口为8000');
}

export default {
  start,
};
