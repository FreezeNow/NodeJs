var setTime = (time) => {
    var tempTime = "";
    if (time > 3600) {
        console.log("只支持显示一小时的倒计时，已显示为倒计时一小时，实际倒计时为设置时间");
        time = 3600;
    }
    tempTime += lessTen(Math.floor(time/60)) + ' : ';
    tempTime += lessTen(time % 60);
    tempTime.substring(0, tempTime.lastIndexOf(':'));
    return tempTime;
}

function lessTen(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}