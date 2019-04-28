import Vue from './vue';
import vue_login_data from './vue_app_login_data';
import vue_login_methods from './vue_app_login_methods';

const { data } = vue_login_data;
const { methods } = vue_login_methods;

const vueLogin = new Vue({
  el: '#login',
  data,
  methods,
});

Vue.use({
  vueLogin,
});

export default {
  vueLogin,
}