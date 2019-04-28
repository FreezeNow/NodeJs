import vue_component_header from './vue_component_header';
import vue_component_gotop from './vue_component_gotop';
import vue_app_blog from './vue_app_blog';
import app_blog_ajaxGetBlogs from './app_blog_ajaxGetBlogs';
import './page_ajaxLogin';

const tempHasLogin = setInterval(() => {
  const { vHeader } = vue_component_header;
  const { blogsData } = vue_app_blog;
  const { ajaxGetBlogs } = app_blog_ajaxGetBlogs;
  vHeader.$children.forEach((child) => {
    if (child.loginTip) {
      if (child.loginTip.on) {
        clearInterval(tempHasLogin);
        ajaxGetBlogs(blogsData);
      }
    }
  });
}, 0);
console.log(window);

window.onscroll = () => {
  const { vGoTop } = vue_component_gotop;
  if (window.pageYOffset > 300) {
    vGoTop.$children.forEach((child) => {
      if (child.goTopDivClass) {
        child.goTopDivClass.on = true;
      }
    });
  } else {
    vGoTop.$children.forEach((child) => {
      if (child.goTopDivClass) {
        child.goTopDivClass.on = false;
      }
    });
  }
};