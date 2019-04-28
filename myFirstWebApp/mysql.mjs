import mysql from 'mysql';
// 登陆页面登陆时调用
const loginVerification = function (response, post) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users',
    connectTimeout: 1000 * 30,
  });
  const flag = {
    name: false,
    password: false,
  };
  const {name, password} = post;
  
  console.log(`name: ${name}`);
  console.log(`pass: ${password}`);
  const sql = `select password from users where name="${name}"`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(`error: ${error}`);
    } else if (Object.keys(result).length !== 0) {
      if (result[0].password === password) {
        console.log('找到了');
        flag.name = true;
        flag.password = true;
      } else {
        console.log('密码错误');
        flag.name = true;
      }
    }
    response.end(JSON.stringify(flag));
    connection.end();
  });
}
// 非登陆界面，使用cookie登陆调用
const ajaxUser = function (response, post) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users',
    connectTimeout: 1000 * 30,
  });
  const flag = {
    name: false,
    password: false,
    user: null,
  };
  const {name, password} = post;
  console.log(`name: ${name}`);
  console.log(`pass: ${password}`);
  const sql = `select password,currency from users where name="${name}"`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(`error: ${error}`);
    } else if (Object.keys(result).length !== 0) {
      if (result[0].password === password) {
        flag.name = true;
        flag.password = true;
        flag.user = 
          `<p>您好,${name}</p>
          <button id="exit">退出</button>`;
      }
    }
    response.end(JSON.stringify(flag));
    connection.end();
  });
};
// 注册界面判断是否存在该用户
const hasName = function (response, post) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users',
    connectTimeout: 1000 * 30,
  });
  const flag = {
    name: false,
  };
  const {name} = post;
  console.log(`name: ${name}`);
  const sql = `select name from users where name="${name}"`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(`error: ${error}`);
    } else if (Object.keys(result).length === 0) {
      flag.name = true;
    }
    response.end(JSON.stringify(flag));
    connection.end();
  });
};
// 注册新用户
const ajaxRegister = function (response, post) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users',
    connectTimeout: 1000 * 30,
  });
  const flag = {
    flag: false,
  };
  const {name, password} = post;
  console.log(`name: ${name}`);
  console.log(`pass: ${password}`);
  const sql = `insert into users(id, name, password, currency) values(0, ?, ?, 0)`;
  const newUser = [name, password];
  connection.query(sql, newUser, (error, result) => {
    if (error) {
      console.log(`error: ${error}`);
    } else {
      console.log(`成功注册: ${result.affectedRows}行`);
      flag.flag = true;
    }
    response.end(JSON.stringify(flag));
    connection.end();
  });
};

const ajaxReceieChest = function (response, post) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users',
    connectTimeout: 1000 * 30,
  });
  const flag = {
    flag: false,
  };
  const {name} = post;
  const changeCurrency = 1;
  const sql = `update users set currency = currency + ${changeCurrency} where name="${name}"`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(`error: ${error}`);
    } else {
      console.log(`ReceieChest:`);
      console.log(result);
      
      flag.flag = true;
    }
    response.end(JSON.stringify(flag));
    connection.end();
  });
};

const ajaxGetBlogs = function (response, post) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users',
    connectTimeout: 1000 * 30,
  });
  const blogs = [];
  const {name} = post;
  console.log(`name: ${name}`);
  const sql = `select title,content,createTime from blogs where userId in (select id from users where name="${name}")`;
  connection.query(sql, (error, result) => {
    console.log(`GetBlogs:`);
    console.log(result);
    
    if (error) {
      console.log(`error: ${error}`);
    } else if (result.length !== 0) {
      result.forEach(blog => {
        blogs.push({
          title: blog.title,
          content: blog.content,
          createTime: blog.createTime,
        })
      });
    } else if (result.length === 0){
      blogs.push({
        title: '无博客', 
        content: '', 
        createTime: '',
      });
    }
    response.end(JSON.stringify(blogs));
    connection.end();
  });
}

export default {
  loginVerification,
  ajaxUser,
  hasName,
  ajaxRegister,
  ajaxReceieChest,
  ajaxGetBlogs,
};
