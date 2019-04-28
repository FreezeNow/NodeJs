import common_ajax from './common_ajax';

// 修改data的verifyImgSrc
const getVerify = function (data) {
  const { ajax } = common_ajax;

  ajax('getVerify', 'GET', {
    callback: (xmlhttp) => {
      data.verifyImgSrc =  xmlhttp.responseText;
    },
  });
}

export default {
  getVerify,
};
