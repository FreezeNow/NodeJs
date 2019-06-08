import common_ajax from './common_ajax';
import common_cookie from './common_cookie';
const {ajax} = common_ajax;
const {getCookie} = common_cookie;

const ajaxGetBlogs = (data) => {
  ajax('ajaxGetBlogs', 'POST' ,{
    data: {
      name: getCookie('name'),
    },
    callback: (result) => {
      data.blogs = result;
      data.blogs.forEach((blog) => {
        const patt1 = /<[^>]+>/g;
        blog.content = blog.content.replace(patt1, "");
      });
    }
  })
};

export default {
  ajaxGetBlogs,
};
