import vue_header from './vue_component_header';
import app_receiverChest_countDown from './app_receiverChest_countDown';
import './vue_app_receiveChest';
import './page_ajaxLogin';

const tempHasLogin = setInterval(() => {
  const { vHeader } = vue_header;
  const { countDown } = app_receiverChest_countDown;
  vHeader.$children.forEach((child) => {
    if (child.loginTip) {
      if (child.loginTip.on) {
        clearInterval(tempHasLogin);
        countDown();
      }
    }
  });
}, 500);