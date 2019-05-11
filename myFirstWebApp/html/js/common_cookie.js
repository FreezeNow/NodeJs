const getCookie = function (name) {
  const cookies = document.cookie.split(';');
  let result = '';
  cookies.forEach((cookie) => {
    if (cookie.indexOf(name) !== -1) {
      result = cookie.substring(cookie.indexOf('=') + 1);
    }
  });
  return result;
};

export default {
  getCookie,
}