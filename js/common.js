(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) {
                docEl.style.fontSize = 20 + 'px';
            } else {
                docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
            };
        };
    if (!doc.addEventListener) {
        docEl.style.fontSize = 20 + 'px';
    } else {
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    }
})(document, window);

function url(obj){
    var host = 'http://admin.linzimei.com.cn/api/';
    // var host = 'http://lzm.banyuekj.com/api/';
    var timeStamp = getTime();
    var key = '10c8362213b343ea83d10640d03a6365';
    // var key = 123;
    var json = {
        timeStamp: timeStamp,
        sign: sha1(timeStamp + key),
        params: obj.data,
        client:"m"
    }
    $.ajax({
        url: host + obj.url,
        type: obj.type || 'post',
        data: json,
        success: function(res){
            if(res.code == 0){
                obj.success(res.data)
            }else if(res.code == 9999){
                layer.msg('登录异常！');
                // location.href='login.html';
            }else{
                // alert(res.msg)
                obj.fail ? obj.fail(res.msg) : layer.msg(res.msg);
            }
        },
        error: obj.error,
        complete: obj.complete
    })
}   

function getTime() {
    return Date.parse(new Date()) / 1000;
}


function getParams(name) {
    var urlParams = location.search;
    if (urlParams.indexOf('?') == 0) {
        urlParams = urlParams.substr(1);
        var arr = urlParams.split('&');
        for (var i = 0; i < arr.length; i++) {
            var itemArr = arr[i].split('=');
            if(itemArr[0] == name){
                return itemArr[1];
            }
        }
    }
    return name
};
//验证密码
function validatePwd(pwdValue){
    var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    return reg.test(pwdValue);
}
//验证手机号
function validatePhone(phoneValue){
    var reg= /^1[34578]\d{9}$/;
    return reg.test(phoneValue);
}


var chrsz = 8;
function sha1(s) {
    var binarray = core_sha1(str2binb(s), s.length * chrsz);
    var hex_tab = "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
    }
    return str;
  }

  function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
      bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
    return bin;
  }

  function core_sha1(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;
    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;

    function safe_add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }
    function rol(num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt));
    }
    function sha1_kt(t) {
      return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
    }
    function sha1_ft(t, b, c, d) {
      if (t < 20) return (b & c) | ((~b) & d);
      if (t < 40) return b ^ c ^ d;
      if (t < 60) return (b & c) | (b & d) | (c & d);
      return b ^ c ^ d;
    }

    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      var olde = e;
      for (var j = 0; j < 80; j++) {
        if (j < 16) w[j] = x[i + j];
        else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
        var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
        e = d;
        d = c;
        c = rol(b, 30);
        b = a;
        a = t;
      }
      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
      e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);
  }

  //上传图片
  function upload (file,obj) {
    var timeStamp = getTime();
    var key = '10c8362213b343ea83d10640d03a6365';
    // var key = 123;
    let param = new FormData()  // 创建form对象
    param.append('pic', file)  // 通过append向form对象添加数据
    param.append('timeStamp', timeStamp);
    param.append('sign', sha1(timeStamp + key));
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    var url = 'http://admin.linzimei.com.cn/api/common/upload';
    // var url = 'http://lzm.banyuekj.com/api/common/upload';
    $.ajax({
        url,
        type: 'post',
        data: param,
        // headers: { 'Content-Type': 'multipart/form-data' },
        async: true,
        processData: false,
        contentType: false,
        success: function(res){
            if(res.code == 0){
                obj.success(res.data)
            }else{
                // alert(res.msg)
                obj.fail ? obj.fail(res.msg) : layer.msg(res.msg);
            }
        },
        error: obj.error,
        complete: obj.complete
    })
    //return axios.post(baseURL + '/common/upload', param, config)
  }
// ios滑动问题
// function preventDefault(ev) {
//     ev.preventDefault()
// }
// document.addEventListener('touchmove', preventDefault, false);
// function isScroller(el) {
// // 判断元素是否为 scroller
// return el.classList.contains('scroller')
// }
// document.body.addEventListener('touchmove', function (ev) {
// var target = ev.target
// // 在 scroller 上滑动，阻止事件冒泡，启用浏览器默认行为。
// if (isScroller(target)) {
//   ev.stopPropagation()
// }
// }, false)   
  

