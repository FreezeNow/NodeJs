const lessTen = function (i) {
  let tempI = i;
  if (i < 10) {
    tempI = `0${i}`;
  }
  return tempI;
}

const setTime = function(t) {
  let time = t;
  let tempTime = '';
  if (time > 3600) {
    console.log('只支持显示一小时的倒计时，已显示为倒计时一小时，实际倒计时为设置时间');
    time = 3600;
  }
  tempTime += `${lessTen(Math.floor(time / 60))} : `;
  tempTime += lessTen(time % 60);
  tempTime.substring(0, tempTime.lastIndexOf(':'));
  return tempTime;
}

export default {
  setTime,
};
