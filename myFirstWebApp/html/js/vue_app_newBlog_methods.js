import vue_app_newBlog_data from './vue_app_newBlog_data';
import common_ajax from './common_ajax';
import common_cookie from './common_cookie';

const { newBlogData } = vue_app_newBlog_data;
const { ajax } = common_ajax;
const { getCookie } = common_cookie;

const newBlogMethods = {
  updata() {
    // const tempMsg = newBlogData.textareaBlog.split('\n');
    // let tempStr = '';
    // tempMsg.forEach(msg => {
    //   const blodStr = msg.split('**');
    //   if (blodStr.length > 2 && blodStr.length % 2 !== 0) {
    //     for (let i = 1; i < blodStr.length - 1; i++) {
    //       blodStr[i] = `<b>${blodStr[i]}</b>`;
    //     }
    //     msg = blodStr.join('');
    //   }
    //   const italicStr = msg.split('__');
    //   if (italicStr.length > 2 && italicStr.length % 2 !== 0) {
    //     for (let i = 1; i < italicStr.length - 1; i++) {
    //       italicStr[i] = `<i>${italicStr[i]}</i>`;
    //     }
    //     msg = italicStr.join('');
    //   }

    //   tempStr += `<p>${msg}</p>`
    // });
    // newBlogData.showBlog = tempStr;

    let tempStr = newBlogData.textareaBlog;
    console.log(tempStr);
    
    const blodStr = newBlogData.textareaBlog.split('**');
    if (blodStr.length > 2 && blodStr.length % 2 !== 0) {
      for (let i = 1; i < blodStr.length - 1; i += 2) {
        blodStr[i] = `<b>${blodStr[i]}</b>`;
      }
      tempStr = blodStr.join('');
      console.log(tempStr);

    }
    const italicStr = tempStr.split('__');
    if (italicStr.length > 2 && italicStr.length % 2 !== 0) {
      for (let i = 1; i < italicStr.length - 1; i += 2) {
        italicStr[i] = `<i>${italicStr[i]}</i>`;
      }
      tempStr = italicStr.join('');
    }
    const tempMsg = tempStr.split('\n');
    tempStr = '';
    tempMsg.forEach(msg => {
      tempStr += `<p>${msg}</p>`
    });
    newBlogData.showBlog = tempStr;
  },
  setBlodClick() {
    const sStart = this.$refs.textareaBlog.selectionStart;
    const sEnd = this.$refs.textareaBlog.selectionEnd;
    if (sStart === sEnd) {
      const addStr = '**需加粗文字**';

      newBlogData.textareaBlog = `${newBlogData.textareaBlog.substring(0, sStart)}${addStr}${newBlogData.textareaBlog.substring(sEnd)}`;
      this.updata();
      // 因为vue的数据更新是异步的，故使聚焦变成异步来使其运行在vue的数据更新之后。
      // 否则此时还是未插入数据的状态。
      setTimeout(() => {
        this.$refs.textareaBlog.focus();
        this.$refs.textareaBlog.setSelectionRange(sEnd + 2, sEnd + 7);
      }, 0);
    } else {
      const selectedStr = newBlogData.textareaBlog.substring(sStart, sEnd);
      newBlogData.textareaBlog = `${newBlogData.textareaBlog.substring(0, sStart)}**${selectedStr}**${newBlogData.textareaBlog.substring(sEnd)}`;
      this.updata();
    }
  },
  setItalicClick() {
    const sStart = this.$refs.textareaBlog.selectionStart;
    const sEnd = this.$refs.textareaBlog.selectionEnd;
    if (sStart === sEnd) {
      const addStr = '__需倾斜文字__';

      newBlogData.textareaBlog = `${newBlogData.textareaBlog.substring(0, sStart)}${addStr}${newBlogData.textareaBlog.substring(sEnd)}`;
      this.updata();
      // 因为vue的数据更新是异步的，故使聚焦变成异步来使其运行在vue的数据更新之后。
      // 否则此时还是未插入数据的状态。
      setTimeout(() => {
        this.$refs.textareaBlog.focus();
        this.$refs.textareaBlog.setSelectionRange(sEnd + 2, sEnd + 7);
      }, 0);
    } else {
      const selectedStr = newBlogData.textareaBlog.substring(sStart, sEnd);
      newBlogData.textareaBlog = `${newBlogData.textareaBlog.substring(0, sStart)}__${selectedStr}__${newBlogData.textareaBlog.substring(sEnd)}`;
      this.updata();
    }
  },
  getBlogInput(event) {
    // console.log(event);
    
    // if (event.data) {
      setTimeout(() => {
        this.updata();
      }, 0);
    // }
  },
  getBlogKeyup(event) {
    const keyCode = event.keyCode;

    switch (keyCode) {
      case 13:
        this.updata();
        break;
      case 8:
        this.updata();
        break;
      default:
        break;
    }
  },
  publishBlogClick() {
    const lessTen = function (i) {
      let tempI = i;
      if (i < 10) {
        tempI = `0${i}`;
      }
      return tempI;
    }
    // if (newBlogData.titleBlog.trim().length === 0) {
      
    // }
    const date = new Date();
    const createTime = `${date.getFullYear()}/${lessTen(date.getMonth() + 1)}/${lessTen(date.getDate())} ${lessTen(date.getHours())}:${lessTen(date.getMinutes())}:${lessTen(date.getSeconds())}`;
    console.log(createTime);
    
    ajax('ajaxPublishBlog', 'POST', {
      data: {
        name: getCookie('name'),
        title: newBlogData.titleBlog,
        blog: newBlogData.showBlog,
        createTime,
      },
      callback(result) {
        if(result.flag) {
          window.location.href = 'http://localhost:8080/blog.html';
        }
      },
    })
  },
};

export default {
  newBlogMethods,
};
