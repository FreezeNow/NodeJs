import vue_component_header from './vue_component_header';
import vue_component_gotop from './vue_component_gotop';
import vue_app_blog from './vue_app_blog';
import app_blog_ajaxGetBlogs from './app_blog_ajaxGetBlogs';
import app_blog_changePosition from './app_blog_changePosition';
import './page_ajaxLogin';

const {changePosition} = app_blog_changePosition;

let count = 0;
const tempHasLogin = setInterval(() => {
  const { vHeader } = vue_component_header;
  const { blogsData } = vue_app_blog;
  const { ajaxGetBlogs } = app_blog_ajaxGetBlogs;
  count++;
  console.log(count);
  vHeader.$children.forEach((child) => {
    if (child.loginTip) {
      if (child.loginTip.on) {
        clearInterval(tempHasLogin);
        ajaxGetBlogs(blogsData);
      }
    }
  });
  if (count >= 10000) {
    clearInterval(tempHasLogin);
  }
}, 1);

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

window.onresize = changePosition;