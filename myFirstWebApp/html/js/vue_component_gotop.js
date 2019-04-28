import Vue from './vue';

const vCGoTop = {
  data: () => {
    return {
      goTopDivClass: {
        on: false,
      }
    }
  },
  methods: {
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  template: `
    <div id="goTop" :class="goTopDivClass" @click="goTop">
      返回顶部
    </div>
  `,
};

const vGoTop = new Vue({
  el: '#vGoTop',
  components: {
    'component-gotop': vCGoTop,
  },
});


Vue.use({
  vGoTop,
});



export default {
  vGoTop,
};
