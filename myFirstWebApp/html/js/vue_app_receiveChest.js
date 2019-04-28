import Vue from './vue';
import vue_receiveChest_data from './vue_app_receiveChest_data';
import vue_receiveChest_methods from './vue_app_receiveChest_methods';

const { chestData } = vue_receiveChest_data;
const { chestMethods } = vue_receiveChest_methods;


const vChest = new Vue({
  el: '#vChest',
  data: chestData,
  methods: chestMethods,
});

Vue.use({
  vNav,
  vUser,
  vLoginTip,
  vChest,
});

export default {
  chestData,
}