const getCookie = function (name) {
  const cookies = document.cookie.split(';');
  let tempResult = '';
  cookies.forEach((cookie) => {
    if (cookie.indexOf(name) !== -1) {
      tempResult = cookie.substring(cookie.indexOf('=') + 1);
    }
  });
  return tempResult;
};

export default {
  getCookie,
}