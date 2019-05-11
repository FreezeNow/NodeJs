import vue_receiveChest_data from './vue_app_receiveChest_data';
import page_verify from './page_verify';
import page_isTrue from './page_isTrue';
import common_ajax from './common_ajax';
import common_cookie from './common_cookie';

const { chestData } = vue_receiveChest_data;
const { isTrue } = page_isTrue;
const { getVerify } = page_verify;
const { ajax } = common_ajax;
const { getCookie } = common_cookie;

const chestMethods = {
  // 打开宝箱的按钮
  openChestClick: function () {
    if (chestData.getBoxClass.on) {
      chestData.getBoxClass.on = false;
      chestData.getBoxClass.off = true;
    } else {
      chestData.getBoxClass.on = true;
      chestData.getBoxClass.off = false;
      this.$refs.getBoxRef.focus();
      getVerify(chestData);
    }
  },
  // 领取界面失焦触发
  getBoxBlur: function (e) {
    const isIn = e.relatedTarget;
    console.log(isIn);
    
    if (!isIn || !( isIn.id.includes('verify') ||
      isIn.id.includes('receiveChest') ||
      isIn.id.includes('getBox') ||
      isIn.id.includes('getBoxReceiveBtn'))) {
      chestData.getBoxClass.on = false;
      chestData.getBoxClass.off = true;
    }
  },
  // 点击改变验证码图片
  imgChangeVerifyClick: () => {
    getVerify(chestData);
  },
  // 领取按钮
  btnReceiveAwardClick: function () {
    isTrue(chestData);
    chestData.verifyTipClass.on = true;
    this.$refs.getBoxRef.focus();
    setTimeout(() => {
      chestData.verifyTipClass.on = false;
    }, 1000);
    if (chestData.verifyTipClass.best) {
      // 调用ajax，告知服务器增加余额
      
      const user = {
        name: getCookie('name'),
      };
      ajax('ajaxReceieChest', 'POST', {
        data: JSON.stringify(user),
        callback: (result) => {
          if (result.flag) {
            chestData.getBoxClass.on = false;
            chestData.getBoxClass.off = true;
            chestData.btnReceiveChestDisabled = true;
            chestData.btnReceiveChestHtml = '宝箱已领取';
          }
        }
      });

    }
  },
};

export default {
  chestMethods,
};
