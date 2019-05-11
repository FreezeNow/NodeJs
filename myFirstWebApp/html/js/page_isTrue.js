import verify from './page_verify';
import common_cookie from './common_cookie';

// 判断输入的验证码是否正确
const isTrue = (data) => {
  const { getVerify } = verify;
  const { getCookie } = common_cookie;

  const userVerifyValue = data.verifyTxt;
  const cookies = document.cookie.split(';');
  let cipher = getCookie('verify');
  let verifyTemp = '';
  switch (cipher.length) {
    case 9:
    verifyTemp += (cipher.charCodeAt(7) - 97);
    case 6:
    verifyTemp = cipher.charCodeAt(4) - 97 + verifyTemp;
    case 3:
    verifyTemp = cipher.charCodeAt(1) - 97 + verifyTemp;
  }

  if (verifyTemp === userVerifyValue) {
    data.verifyTipMsgHtml = '验证码正确~';
    data.verifyTipClass.best = true;
    document.cookie = `verify=${cipher}; Max-Age=-1`
  } else {
    data.verifyTipMsgHtml = '验证码错误!';
    data.verifyTipClass.best = false;
    getVerify(data);
  }
};

export default {
  isTrue,
}