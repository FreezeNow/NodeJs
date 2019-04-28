import vue_component_header from "./vue_component_header";

const userMethods = {
  exit(e) {
    if (e.target.id === 'exit') {
      const { vHeader } = vue_component_header;
      document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'password=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      vHeader.$children.forEach((child) => {
        if (child.user && child.login) {
          child.user = child.login;
        } else if (child.loginTip) {
          child.loginTip.on = true;
          child.loginTipMsg = '退出成功';
          setTimeout(() => {
            child.loginTip.on = false;
            setTimeout(() => {
              window.history.go(0);
            }, 500);
          }, 1000);
        }
      });
    }
  },
};

export default {
  userMethods,
};
