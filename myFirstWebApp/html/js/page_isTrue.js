import verify from './page_verify';

// 判断输入的验证码是否正确
const isTrue = (data) => {
  const { getVerify } = verify;

  const userVerifyValue = data.verifyTxt;
  
  const cookies = document.cookie.split(';');

  let cipher = '';
  cookies.forEach((cookie) => {
    if (cookie.includes('verify')) {
      cipher = cookie.substring(cookie.indexOf('=') + 1);
    }
  });
  let verifyTemp = '';
  switch (cipher.length) {
    case 9:
    verifyTemp += (cipher.charCodeAt(7) - 97);
    case 6:
    verifyTemp = cipher.charCodeAt(4) - 97 + verifyTemp;
    case 3:
    verifyTemp = cipher.charCodeAt(1) - 97 + verifyTemp;
  }
  console.log(userVerifyValue);
  console.log(verifyTemp);


  if (verifyTemp === userVerifyValue) {
    data.verifyTipMsg = '验证码正确~';
    data.verifyTipClass.best = true;
    document.cookie = `verify=${cipher}; Max-Age=-1`
  } else {
    data.verifyTipMsg = '验证码错误!';
    data.verifyTipClass.best = false;
    getVerify(data);
  }
};

export default {
  isTrue,
}