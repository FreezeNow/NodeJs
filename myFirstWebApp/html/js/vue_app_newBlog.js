import Vue from './vue';
import vue_app_newBlog_data from './vue_app_newBlog_data';
import vue_app_newBlog_methods from './vue_app_newBlog_methods';

const { newBlogData } = vue_app_newBlog_data;
const { newBlogMethods } = vue_app_newBlog_methods;

const vNewBlog = new Vue({
  el: '#vNewBlog',
  data: newBlogData,
  methods: newBlogMethods,
});

Vue.use({
  vNewBlog,
});

export default {
  newBlogData,
}