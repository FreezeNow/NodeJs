import Vue from './vue';

const blogsData = {
  blogs: [
    {title: '请登录',content: '',createTime: ''}
  ],
}

const vBlogs = new Vue({
  el: '#vBlogs',
  data: blogsData,
});

Vue.use({
  vBlogs,
});

export default {
  blogsData,
}