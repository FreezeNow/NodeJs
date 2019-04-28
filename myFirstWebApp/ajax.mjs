const login = function (request, response, mysql) {
  let post = '';
  request.on('error', (err) => {
    console.error(err.stack);
  });
  
  request.on('data', (chunk) => {
    post += chunk;
  });

  // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  request.on('end', () => {
    post = JSON.parse(post);
    mysql(response, post.name, post.password);
  });
}

const hasName = function (request, response, mysql) {
  let post = '';
  request.on('error', (err) => {
    console.error(err.stack);
  });
  
  request.on('data', (chunk) => {
    post += chunk;
  });

  // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  request.on('end', () => {
    post = JSON.parse(post);
    mysql(response, post.name);
  });
};

const ajax = function (request, response, mysql) {
  let post = '';
  request.on('error', (err) => {
    console.error(err.stack);
  });
  
  request.on('data', (chunk) => {
    post += chunk;
  });

  // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  request.on('end', () => {
    post = JSON.parse(post);
    mysql(response, post);
  });
};

export default {
  login,
  hasName,
  ajax,
};
