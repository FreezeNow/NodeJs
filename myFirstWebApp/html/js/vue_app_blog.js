import Vue from './vue';

const sidebarData = {
  sidebarClass: {
    sidebarMinPosition: false,
  },
}

const blogsData = {
  blogs: [
    {title: '请登录',content: '',createTime: ''}
  ],
  blogsClass: {
    blogsMinPosition: false,
  },
}
const vSidebar = new Vue({
  el: '#vSidebar',
  data: sidebarData,
})
const vBlogs = new Vue({
  el: '#vBlogs',
  data: blogsData,
});

Vue.use({
  vSidebar,
  vBlogs,
});

export default {
  blogsData,
  sidebarData,
}