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
  openChestBtn: function () {
    if (chestData.getBoxClass.on) {
      chestData.getBoxClass.on = false;
      chestData.getBoxClass.off = true;
    } else {
      chestData.getBoxClass.on = true;
      chestData.getBoxClass.off = false;
      this.$refs.refGetBox.focus();
      getVerify(chestData);
    }
  },
  // 领取界面失焦触发
  blurGetBox: function (e) {
    // console.log(e);
    
    const isIn = e.relatedTarget;
    console.log(isIn);
    
    if (!isIn || !( isIn.id.includes('verify') ||
      isIn.id.includes('receiveChest') ||
      isIn.id.includes('getBoxReceiveBtn'))) {
      chestData.getBoxClass.on = false;
      chestData.getBoxClass.off = true;
    }
  },
  // 点击改变验证码图片
  clickChangeVerifyImg: () => {
    getVerify(chestData);
  },
  // 领取按钮
  clickReceiveAwardBtn: function () {
    isTrue(chestData);
    chestData.verifyTipClass.on = true;
    this.$refs.refGetBox.focus();
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
        callback: (xmlhttp) => {
          const flag = JSON.parse(xmlhttp.responseText);
          if (flag.flag) {
            chestData.getBoxClass.on = false;
            chestData.getBoxClass.off = true;
          }
        }
      });

    }
  },
};

export default {
  chestMethods,
};
