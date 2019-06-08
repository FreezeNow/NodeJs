// 导航栏的数据
const navData = () => {
  return {
    navLis: [
      { href: 'index.html', message: '首页' },
      { href: 'receiveChest.html', message: '领取宝箱' },
      { href: 'blog.html', message: '我的博客' },
      { href: 'friendsAndChat.html', message: '好友与聊天' }
    ],
  }
};
// 用户的数据，或者登陆注册的链接
const userData = () => {
  return {
    login:`
      <a href="login.html">登录</a>
      <a href="register.html">注册</a>`,
    user:`
      <a href="login.html">登录</a>
      <a href="register.html">注册</a>`,
    name: '',
  };
};

// 登陆的数据
const loginTipData = () => {
  return {
    loginTip: {
      on: false,
    },
    loginTipMsg: '登录成功',
  };
};

export default {
  navData,
  userData,
  loginTipData,
};