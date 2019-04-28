import vue_component_header from './vue_component_header';
import common_ajax from './common_ajax';

const { ajax } = common_ajax;
// 登陆成功
const loginSuccess = function (flag) {
  const { vHeader } = vue_component_header;
  console.log(vHeader);

  vHeader.$children.forEach((child) => {
    if (child.user && child.login) {
      child.user = flag.user;
    } else if (child.loginTip) {
      child.loginTip.on = true;
      setTimeout(() => {
        child.loginTip.on = false;
      }, 1000);
    }
  });
}

// 登陆操作
const login = function (name, password) {
  const user = {
    name,
    password,
  };
  ajax('ajaxUser', 'post', {
    data: user,
    callback: (xmlhttp) => {
      const flag = JSON.parse(xmlhttp.responseText);
      console.log(JSON.stringify(flag));
      if (flag.password) {
        loginSuccess(flag);
      }
    },
  });
};

const getCookie = function (name) {
  const cookies = document.cookie.split(';');
  let tempResult = '';
  cookies.forEach((cookie) => {
    if (cookie.indexOf(name) !== -1) {
      tempResult = cookie.substring(cookie.indexOf('=') + 1);
    }
  });
  return tempResult;
};

const hasCookie = function () {
  const name = getCookie('name').trim();
  const password = getCookie('password');
  if (name.length > 0 && password.length > 0) {
    login(name, password);
  }
};
hasCookie();
export default {
  hasCookie,
};
