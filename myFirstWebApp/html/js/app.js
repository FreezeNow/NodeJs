var p = document.querySelector('p');
var button = document.querySelector('button');

var time = 0.1 * 60;
p.innerHTML = setTime(time);
var t = setInterval(() => {
    time--;
    if (time <= 0) {
        clearInterval(t);
        button.removeAttribute('disabled');
        button.innerHTML = '宝箱可以领取啦';
    }
    p.innerHTML = setTime(time);
}, 1000);


function btnAjax() {
    
}