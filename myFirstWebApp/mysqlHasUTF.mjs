import mysql from 'mysql';

const book = function (name, response) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bookpro',
    connectTimeout: 1000 * 30,
    // charset: 'ISO-8859-1',
  });

  const flag = {
    name: false,
    password: false,
  };
  connection.query(`select * from book where bookname="${name}"`, (error, result) => {
    if (error) {
      console.log(`error: ${error}`);
    } else if (Object.keys(result).length !== 0) {
      for (const x in result[0]) {
        console.log(result[0][x]);
        
      }
    }
    connection.end();
  });
}

book('bili');

const login = function (name, password) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'login',
    connectTimeout: 1000 * 30,
    charset: 'utf8_general_ci',
  });

  const flag = {
    name: false,
    password: false,
  };
  console.log(`name: ${name}`);
  console.log(`pass: ${password}`);
  connection.query(`select password from login where name="${name}"`, (error, result) => {
    if (error) {
      console.log(`error: ${error}`);
    } else if (Object.keys(result).length !== 0) {
      if (result[0].password === password) {
        console.log(result[0].password);
      }
    }
    
    connection.end();
  });
}



// login('啊', '啊');
// login('好', '好');
// login('root', 'root');

