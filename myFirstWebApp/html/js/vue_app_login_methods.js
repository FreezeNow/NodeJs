import app_login_login from './app_login_login';
import vue_login_data from './vue_app_login_data';

const { loginVerification } = app_login_login;
const { data } = vue_login_data;

const methods = {
  clickLoginBtn: () => {
    loginVerification(data);
  },
  clickBackBtn: () => {
    window.history.go(-1);
  }
};

export default {
  methods,
}