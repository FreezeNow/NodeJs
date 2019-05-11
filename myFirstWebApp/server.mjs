import http from 'http';
import url from 'url';
import path from 'path';
import mysql from './mysql';
import ajax from './ajax';
import verify from './verify';

const start = function (file) {
  const onRequest = function (request, response) {

    const { loginVerification, ajaxUser, hasName, ajaxRegister, ajaxReceieChest, ajaxGetBlogs, ajaxPublishBlog } = mysql;
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

  http.createServer(onRequest).listen(8080);
  console.log('服务器启动,端口为8080');
}

export default {
  start,
};
