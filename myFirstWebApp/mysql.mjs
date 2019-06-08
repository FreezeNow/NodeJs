import mysql from 'mysql';

const mysqlFn = (database, sql, {
  dataArr = [],
  callback = () => { }
} = {}) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database,
    connectTimeout: 1000 * 30,
  });

  connection.query(sql, dataArr, (error, result) => {
    if (error) {
      console.log(`${error}`);
    } else {
      callback(result);
    }
    // response.end(JSON.stringify(flag));
    setTimeout(() => {
      connection.end();
    }, 0);

  });
};
// 登陆页面登陆时调用
const loginVerification = function (response, post) {
  const flag = {
    name: false,
    password: false,
  };
  const { name, password } = post;

  console.log(`name: ${name}`);
  console.log(`pass: ${password}`);
  const sql = `select password from users where name="${name}"`;

  mysqlFn('users', sql, {
    callback(result) {
      if (Object.keys(result).length !== 0) {
        if (result[0].password === password) {
          console.log('找到了');
          flag.name = true;
          flag.password = true;
        } else {
          console.log('密码错误');
          flag.name = true;
        }
        response.end(JSON.stringify(flag));
      }
    }
  });
}
// 非登陆界面，使用cookie登陆调用
const ajaxUser = function (response, post) {
  const flag = {
    name: false,
    password: false,
    user: null,
  };
  const { name, password } = post;
  const sql = `select password,currency from users where name="${name}"`;
  mysqlFn('users', sql, {
    callback(result) {
      if (Object.keys(result).length !== 0) {
        if (result[0].password === password) {
          flag.name = true;
          flag.password = true;
          flag.user = `
            <span>您好,${name}</span>
            <button id="exit">退出</button>
          `;
          response.end(JSON.stringify(flag));
        }
      }
    },
  });
};
// 注册界面判断是否存在该用户
const hasName = function (response, post) {
  const flag = {
    name: false,
  };
  const { name } = post;
  console.log(`name: ${name}`);
  const sql = `select name from users where name="${name}"`;

  mysqlFn('users', sql, {
    callback(result) {
      if (Object.keys(result).length === 0) {
        flag.name = true;
      }
      response.end(JSON.stringify(flag));
    },
  });
};
// 注册新用户
const ajaxRegister = function (response, post) {
  const flag = {
    flag: false,
  };
  const { name, password } = post;
  console.log(`name: ${name}`);
  console.log(`pass: ${password}`);
  const sql = `insert into users(name, password) values(?, ?)`;
  const newUser = [name, password];

  mysqlFn('users', sql, {
    dataArr: newUser,
    callback(result) {
      console.log(`成功注册: ${result.affectedRows}行`);
      flag.flag = true;
      response.end(JSON.stringify(flag));
    },
  });
};
// 领取宝箱后增加余额
const ajaxReceieChest = function (response, post) {
  const flag = {
    flag: false,
  };
  const { name } = post;
  const changeCurrency = 1;
  const sql = `update users set currency = currency + ${changeCurrency} where name="${name}"`;

  mysqlFn('users', sql, {
    callback(result) {
      flag.flag = true;
      response.end(JSON.stringify(flag));
    },
  });
};

const ajaxGetBlogs = function (response, post) {
  const blogs = [];
  const { name } = post;
  console.log(`name: ${name}`);
  const sql = `select title,content,createTime from blogs where userId in (select id from users where name="${name}")`;

  mysqlFn('users', sql, {
    callback(result) {
      if (result.length !== 0) {
        result.forEach(blog => {
          blogs.push({
            title: blog.title,
            content: blog.content,
            createTime: `创建时间: ${blog.createTime}`,
          })
        });
      } else if (result.length === 0) {
        blogs.push({
          title: '无博客',
          content: '',
          createTime: '',
        });
      }
      response.end(JSON.stringify(blogs));
    },
  });
};

const ajaxPublishBlog = function (response, post) {
  const flag = {
    flag: false,
  };
  const { name, title, blog, createTime } = post;
  const sqlFindId = `select id from users where name="${name}"`;
  let userId;

  mysqlFn('users', sqlFindId, {
    callback(result) {
      userId = result[0].id;
      const sql = `insert into blogs(title, content, createTime, userId) values(?, ?, ?, ?)`;
      const newBlog = [title, blog, createTime, userId];
      mysqlFn('users', sql, {
        dataArr: newBlog,
        callback(result) {
          console.log(`成功发布: ${result.affectedRows}篇博客`);
          flag.flag = true;
          response.end(JSON.stringify(flag));
        }
      });
    },
  });
};

const ajaxSearchUser = function (response, post) {
  const  searchResultList = [];

  const { searchBarMsg } = post;

  const sql = `select id, name from users where name="${searchBarMsg}" or id="${searchBarMsg}"`

  mysqlFn('users', sql, {
    callback(result) {
      console.log(`找到${result.length}个用户`);
      if (result.length > 0) {
        result.forEach(searchResult => {
          searchResultList.push({
            id: searchResult.id,
            name: searchResult.name,
          });
        });
      } else {
        searchResultList[0] = {
          name: "未检索到该用户",
        };
      }
      
      response.end(JSON.stringify(searchResultList));
    }
  })
}

export default {
  loginVerification,
  ajaxUser,
  hasName,
  ajaxRegister,
  ajaxReceieChest,
  ajaxGetBlogs,
  ajaxPublishBlog,
  ajaxSearchUser,
};
