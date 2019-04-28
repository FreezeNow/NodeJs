import Vue from './vue';
import vue_component_data from './vue_component_header_data';
import vue_component_methods from './vue_component_header_methods';

const { navData, userData, loginTipData } = vue_component_data;
const { userMethods } = vue_component_methods;

const vCNav = {
  data: navData,
  template: `
    <nav id="vNav">
      <ul class="clearfix">
        <li class="navLi" v-for="navLi of navLis"><a :href="navLi.href" class="navLiA" v-html="navLi.message"></a></li>
      </ul>
    </nav>
  `,
};
const vCUser = {
  data: userData,
  template: `
    <div id="vUser" v-html="user" @click="exit"></div>
  `,
  methods: userMethods,
};
const vCLoginTip = {
  data: loginTipData,
  template: `
    <div id="vLoginTip" :class="loginTip" v-html="loginTipMsg"></div>
  `,
};

const vHeader = new Vue({
  el: '#vHeader',
  components: {
    'component-nav': vCNav,
    'component-user': vCUser,
    'component-login-tip': vCLoginTip,
  },
});

Vue.use({
  vHeader,
})

export default {
  vHeader,
};
