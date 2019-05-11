import vue_receiveChest from './vue_app_receiveChest';
import page_setTime from './page_setTime';

// 宝箱领取倒计时
const countDown = function () {
  const { chestData } = vue_receiveChest;
  const { setTime } = page_setTime;
  // 设置倒计时时间
  let time = 1/30 * 60;
  chestData.chestTimeP = setTime(time);
  const t = setInterval(() => {
    time -= 1;
    // 如果time小于等于0则取消计时器，并使按钮可点击
    if (time <= 0) {
      clearInterval(t);
      chestData.btnReceiveChestDisabled = false;
      chestData.btnReceiveChestHtml = '宝箱可以领取啦';
    }
    chestData.pChestTime = setTime(time);
  }, 1000);
};

export default {
  countDown,
};
