import common_ajax from './common_ajax';
const { ajax } = common_ajax;

const loginVerification = function (data) {
  const user = {
    name: data.nameTxt,
    password: data.passwordTxt,
  };

  ajax('loginVerification', 'post', {
    data: user,
    callback: (result) => {
      if (result.password) {
        const date = new Date();
        date.setTime(date.getTime() + 1000 * 3600 * 24 * 30);
        document.cookie = `name=${user.name}; expires=${date}`;
        document.cookie = `password=${user.password}; expires=${date}`;
        window.history.go(-1);
        // window.location.href = 'http://localhost:8080/index.html';
      } else {
        data.nameTipMsg = '';
        data.passwordTipMsg = '';
        if (result.name) {
          data.passwordTipMsg = '密码错误';
        } else {
          data.nameTipMsg = '用户名错误';
        }
      }
    },
  });
};

export default {
  loginVerification,
};
