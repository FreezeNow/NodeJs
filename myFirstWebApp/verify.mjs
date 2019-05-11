import Canvas from 'canvas';

// 返回一个随机整数
// 该整数最小不小于min，最大不大于等于max+min
// 调用时如只使用一个参数，则第二个参数默认为0
// ES6可以设置默认值真是太爽了
const randomNum = (max, min = 0) =>
  Math.floor(Math.random() * max + min);

// 生成随机颜色
const randomColor = () =>
  'rgb(' + randomNum(255, 0) + ', ' +
  randomNum(255, 0) + ', ' + randomNum(255, 0);

// 简单加密验证码答案，防爬虫(大概？(又不挂网上，防啥爬虫))
const setCipher = (tNum) => {
  const num = Number(tNum);
  let cipher = '';
  if (num < 10) {
    cipher = String.fromCharCode(randomNum(10, 97), num + 97, randomNum(10, 97));
  } else if (num > 10 && num < 100) {
    cipher = String.fromCharCode(randomNum(10, 97), num / 10 + 97, randomNum(10, 97),
      randomNum(10, 97), num % 10 + 97, randomNum(10, 97));
  } else if (num > 100 && num < 1000) {
    cipher = String.fromCharCode(randomNum(10, 97), num / 100 + 97, randomNum(10, 97),
      randomNum(10, 97), num % 100 / 10 + 97, randomNum(10, 97),
      randomNum(10, 97), num % 10 + 97, randomNum(10, 97));
  }
  return cipher;
}

// 产生随机加减验证码
// 可省略设置宽度和高度，有默认值
const setVerify = function (width = 85, height = 30) {
  const verify = Canvas.createCanvas(width, height);
  const ctx = verify.getContext('2d');
  // 产生最多9条最少5条随机长度、位置、颜色的线
  for (let i = 0; i < randomNum(5, 5); i++) {
    ctx.beginPath();
    ctx.moveTo(randomNum(width), randomNum(height));
    ctx.lineTo(randomNum(width), randomNum(height));
    ctx.lineWidth = 1;
    ctx.strokeStyle = randomColor();
    ctx.stroke();
  }
  // 生成2500~499个直径为2px，随机位置的圆
  for (let i = 0; i < randomNum(250, 250); i++) {
    ctx.beginPath();
    // x, y , r, 起始角度, 结束角度
    ctx.arc(randomNum(width), randomNum(height), 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = randomColor();
    ctx.fill();
  }

  const num1 = randomNum(90, 10);
  const num2 = randomNum(9, 1);
  const arithmetics = ['+', '-'];
  const arithmetic = arithmetics[randomNum(arithmetics.length)];
  ctx.font = '20px "sans-serif"';
  // 旋转画布，旋转角度为-7~15的随机数
  ctx.rotate(randomNum(8, randomNum(-7)) * Math.PI / 180);
  ctx.fillStyle = '#000';
  ctx.fillText(num1 + arithmetic + num2, width / 5, height / 3 * 2);
  let tempResult;
  switch (arithmetic) {
    case '+':
      tempResult = num1 + num2;
      break;
    case '-':
      tempResult = num1 - num2;
      break;
  }
  tempResult = setCipher(tempResult);
  return {
    src: verify.toDataURL("image/png"),
    verify: tempResult,
  }
}

const getVerify = function (response) {
  const verify = setVerify();
  const result = {
    src: verify.src,
  }
  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Set-Cookie': `verify=${verify.verify}; Max-Age=30`,
  });
  response.end(JSON.stringify(result));
}

export default {
  getVerify,
}
