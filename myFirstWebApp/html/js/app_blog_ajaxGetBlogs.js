import common_ajax from './common_ajax';
import common_cookie from './common_cookie';
const {ajax} = common_ajax;
const {getCookie} = common_cookie;

const ajaxGetBlogs = (data) => {
  ajax('ajaxGetBlogs', 'POST' ,{
    data: {
      name: getCookie('name'),
    },
    callback: (xmlhttp) => {
      const rBlogs = JSON.parse(xmlhttp.responseText);
      data.blogs = rBlogs;
      console.log(data);
      
    }
  })
};

export default {
  ajaxGetBlogs,
};
