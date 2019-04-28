// 宝箱模块的数据
const chestData = {
  // 倒计时时间
  chestTimeP: '00:00',
  // 按钮提示信息
  receiveChestBtn: '还不能领取宝箱哦',
  // 按钮可否点击
  receiveChestBtnDisabled: true,
  // getBox是否显示
  getBoxClass: {
    on: false,
    off: false,
  },
  verifyTxt: '',
  // 设置验证码图片的src
  verifyImgSrc: false,
  // 验证码提示的class
  verifyTipClass: {
    tip: false,
    best: false,
    on: false,
  },
  // 验证码提示的信息
  verifyTipMsg: '',
}

export default {
  chestData,
}