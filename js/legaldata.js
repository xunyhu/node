function lagedata(list) {
    if (!list.length) return;
    var bl = true;
    var str;
    for (var i=0; i<list.length; i++) {
        var rec = list[i],
            text = rec['text'],
            type = rec['type'],
            data = rec['data'];
        switch (type) {
            case 'tel':
                var re = /^1\d{10}$/;
                if (!re.test(data)) {
                    str = text || "请输入正确的手机号码";
                    bl = false;
                    break;
                };
                break;
            case 'empty':
                if (!data) {
                    str = text;
                    bl = false;
                }
                break;
            case "length":
                if (data.length > rec['other']) {
                    str = text;
                    bl = false;
                }
                break;
        }
        if (!bl) {break;}
    }
    if (!bl) {
        showAlert(str);
        return false;
    }
    return bl;
}

var timesRun = 0;
function showAlert(text) {
    if (timesRun) return;
    timesRun += 1;
    var oBox = document.createElement('div');
        oBox.className = 'alert-tip';
    var oP = document.createElement('p');
        oP.innerText = text || 'error';
    oBox.appendChild(oP);
    var first = document.body.firstChild; 
    document.body.insertBefore(oBox, first); 
    var timeouta = setTimeout(function(){
        oBox.className += ' example-enter-active';
        window.clearTimeout(timeouta);
    }, 300);
    var intervala = setInterval(function(){
        oBox.className += ' example-leave-active';
        var timeoutb = setTimeout(function() {
            document.body.removeChild(oBox);
            timesRun = 0;
            window.clearTimeout(timeoutb);
        }, 300);
        window.clearInterval(intervala);
    },3000);
}
