import common_ajax from './common_ajax';

const { ajax } = common_ajax;

// 密码长度
const passwordSecurity = (data) => {
  const len = data.passwordTxt.length;
  if (len < 7) {
    data.passwordTipMsgHtml = '您的密码长度过短';
    data.passwordTipClass.best = false;
    data.passwordTipClass.good = false;
  } else if (len < 10) {
    data.passwordTipMsgHtml = '您的密码强度较弱';
    data.passwordTipClass.bad = true;
    data.passwordTipClass.best = false;
    data.passwordTipClass.good = false;
  } else if (len < 13) {
    data.passwordTipMsgHtml = '您的密码强度中等';
    data.passwordTipClass.best = false;
    data.passwordTipClass.good = true;
  } else {
    data.passwordTipMsgHtml = '您的密码强度很强';
    data.passwordTipClass.best = true;
    data.passwordTipClass.good = false;
  }
};

// 该用户名是否存在
const hasName = (data) => {
  ajax('hasName', 'post', {
    data: {
      name: data.nameTxt,
    },
    callback: (result) => {
      if (result.name) {
        data.nameTipMsgHtml = '账户名未被注册';
        data.nameTipClass.best = true;
      } else {
        data.nameTipMsgHtml = '账户名已被注册';
        data.nameTipClass.best = false;
      }
    },
  });
};

// AJAX注册
const ajaxRegister = (data) => {

  ajax('ajaxRegister', 'post', {
    data: {
      name: data.nameTxt,
      password: data.passwordTxt,
    },
    callback: (result) => {
      if (result.flag) {
        const date = new Date();
        date.setTime(date.getTime() + 1000 * 3600 * 24 * 30);
        document.cookie = `name=${user.name}; expires=${date}`;
        document.cookie = `password=${user.password}; expires=${date}`;
        window.location.href = 'http://localhost:8080/index.html';
      } else {
        alert('注册失败');
      }
    }
  });
};

export default {
  passwordSecurity,
  hasName,
  ajaxRegister,
};
