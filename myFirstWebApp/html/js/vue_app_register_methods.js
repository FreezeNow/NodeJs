import vueRegisterData from './vue_app_register_data';
import appRegisterRegister from './app_register_register';
import pageVerify from './page_verify';
import pageIsTrue from './page_isTrue';

const { data } = vueRegisterData;
const { passwordSecurity, hasName, ajaxRegister } = appRegisterRegister;
const { getVerify } = pageVerify;
const { isTrue } = pageIsTrue;

const methods = {
  changeNameChange: () => {
    if (data.nameTxt.length === 0) {
      data.nameTipMsgHtml = '用户名不能为空';
      data.nameTipClass.best = false;
    } else {
      hasName(data);
    }
  },
  passwordKeyup: () => {
    passwordSecurity(data);
  },
  passwordRightChange: () => {
    if (data.passwordRightTxt !== data.passwordTxt) {
      data.passwordRightTipMsgHtml = '第二次密码与第一次密码不相同';
      data.passwordRightTipClass.best = false;
    } else {
      data.passwordRightTipMsgHtml = '两次密码相同';
      data.passwordRightTipClass.best = true;
    }
  },
  verifyTxtFocus: () => {
    if (!data.verifyImgSrc) {
      getVerify(data);
    }
  },
  verifyChange: () => {
    if (document.cookie) {
      isTrue(data);
    } else {
      getVerify(data);
      data.verifyTipMsgHtml = '当前验证码超时，已刷新';
      data.verifyTipClass.best = false;
    }
  },
  imgChangeVerifyClick: () => {
    getVerify(data);
  },
  setNewUserClick: () => {
    if (data.nameTipClass.best === true &&
      (data.passwordTipClass.best === true || data.passwordTipClass.good === true || data.passwordTipClass.bad === true) &&
      data.passwordRightTipClass.best === true &&
      data.verifyTipClass.best === true) {
      ajaxRegister(data);
    } else {
      if (data.nameTxt.length === 0) {
        data.nameTipMsgHtml = '用户名不能为空';
      } else if (data.passwordTxt.length === 0) {
        data.passwordTipMsgHtml = '密码不能为空';
      } else if (data.passwordRightTxt.length === 0) {
        data.passwordRightTipMsgHtml = '确认密码不能为空';
      } else if (data.verifyTxt.length === 0) {
        data.verifyTipMsgHtml = '验证码不能为空';
      }
    }
  },
};

export default {
  methods,
}