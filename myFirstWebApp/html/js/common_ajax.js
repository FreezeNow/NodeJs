const ajax = function (url, type, { 
  data = {},
  contentType = 'application/x-www-form-urlencoded',
  async = true,
  callback = function (result) {},
} = {}) {
  // console.log(JSON.stringify(flag));
  const tType = type.toUpperCase().trim();
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      const result = JSON.parse(xmlhttp.responseText);
      callback(result);
    }
  };
  xmlhttp.open(tType, url, async);
  if (tType === 'GET') {
    xmlhttp.send();
  } else {
    xmlhttp.setRequestHeader('Content-type', contentType);
    xmlhttp.send(JSON.stringify(data));
  }
  
};

export default {
  ajax,
};
