import Vue from './vue';
import vue_register_data from './vue_app_register_data';
import vue_register_methods from './vue_app_register_methods';

const { data } = vue_register_data;
const { methods } = vue_register_methods;

const vueRegister = new Vue({
  el: '#register',
  data,
  methods,
});

Vue.use({
  vueRegister,
});
