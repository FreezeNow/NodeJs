import common_ajax from './common_ajax';

// 修改data的verifyImgSrc
const getVerify = function (data) {
  const { ajax } = common_ajax;

  ajax('getVerify', 'GET', {
    callback: (result) => {
      data.imgVerifySrc = result.src;
    },
  });
}

export default {
  getVerify,
};
