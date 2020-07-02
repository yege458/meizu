"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var utils = {
  /**
   * 获取元素最终样式值
   * @param  obj  <DOMObject> 要获取属性的元素对象
   * @param  attr <string>    样式名称
   * @return      <string>    获取到的样式值
   */
  getStyle: function getStyle(obj, attr) {
    if (obj.currentStyle) {
      // 判断Obj有currentStyle这个属性，说明使用的是IE浏览器
      return obj.currentStyle[attr];
    } else {
      // obj没有currentStyle这个属性，说明用的不是IE
      return getComputedStyle(obj, false)[attr];
    }
  },

  /**
   * 添加事件监听
   * @param ele         <DOMObject> 添加事件的DOM元素
   * @param type        <string>    事件类型（不带on）
   * @param fn          <function>  事件处理函数
   * @param [isCapture] <boolean>   可选参数，是否捕获，true代表捕获，false代表冒泡，默认为false
   */
  on: function on(ele, type, fn, isCapture) {
    // 如果参数没有传，默认值为false
    if (isCapture === undefined) isCapture = false;

    if (ele.attachEvent) {
      // IE
      ele.attachEvent('on' + type, fn);
    } else {
      ele.addEventListener(type, fn, isCapture);
    }
  },

  /**
   * 移出事件监听
   * @param ele         <DOMObject> 添加事件的DOM元素
   * @param type        <string>    事件类型（不带on）
   * @param fn          <function>  事件处理函数
   * @param [isCapture] <boolean>   可选参数，是否捕获，true代表捕获，false代表冒泡，默认为false
   */
  off: function off(ele, type, fn, isCapture) {
    // 如果参数没有传，默认值为false
    if (isCapture === undefined) isCapture = false;

    if (ele.detachEvent) {
      ele.detachEvent('on' + type, fn);
    } else {
      ele.removeEventListener(type, fn, isCapture);
    }
  },

  /**
   * 封装匀速运动
   * @param ele       <DOMObject>  要运动的元素对象
   * @param attr      <string>     运动的属性名
   * @param end       <number>     运动的终点，单位px
   * @param duration  <number>     运动总时长，单位ms
   * @param fn        <function>   回调函数，在运动结束以后执行的函数
   */
  move: function move(ele, attr, end, duration, fn) {
    // 获取起点
    var start = parseInt(this.getStyle(ele, attr)); // 算总距离

    var distance = end - start; // var speed = distance / duration // 速度单位是 px/ms
    // 先计算从起点到终点的总步数

    var steps = Math.floor(duration / 30); // 计算速度：每一步要走的像素值 px/步  px/30ms

    var speed = distance / steps;
    var n = 0; // 记录当前是第几步
    // 在开启一个新的定时器之前先把上一次的清除掉

    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
      n++;
      ele.style[attr] = start + n * speed + 'px'; // 用步数判断终点

      if (n === steps) {
        clearInterval(ele.timer); // 固定在终点位置

        ele.style[attr] = end + 'px'; // 运动结束以后调用传过来的这个函数
        // 逻辑短路，这里如果fn无效，会隐式转换为false，逻辑短路，不会执行fn()
        // 一般回调函数都会这么写

        fn && fn();
      }
    }, 30);
  },

  /**
   * 封装一个缓冲运动，咱们的缓冲算法里速度跟时间没有关系的，所以这里不需要传时间，时间就是根据距离来自动得到的
   * @param ele   <DOMObject>  要运动的元素对象
   * @param attr  <string>     运动的属性名
   * @param end   <number>     运动的终点，单位px
   * @param fn    <function>   回调函数，在运动结束以后执行的函数 
   */
  move1: function move1(ele, attr, end, fn) {
    // 开启定时器之前把旧的先清除掉
    clearInterval(ele.timer);
    var start = parseInt(this.getStyle(ele, attr));
    ele.timer = setInterval(function () {
      // 计算剩下距离
      var distance = parseInt(end) - start; // 计算当前这一步的速度，是剩下距离的十分之一
      // speed就是当前这一步要往前走的距离
      // 如果运动是负方向，distance小于0，speed也小于0，剩下最后几步负零点几的时候如果向上取整直接就得到0了，就不能运动到终点了

      var speed = distance > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10); // start得往前加上这一步要走的距离

      start += speed; // 把更新之后的start赋值给属性

      ele.style[attr] = start + 'px'; // 判断终点
      // 由于缓冲运动最后是一像素一像素运动的，所以他一定能刚好达到终点

      if (start === end) {
        clearInterval(ele.timer);
        fn && fn();
      }
    }, 30);
  },

  /** 取cookie
   * @param key <string> 要取得cookie得名称
   * @return <string>    这条cookie的值（如果这条cookie不存在，则返回undefined）
   */
  getCookie: function getCookie(key) {
    // 取到所有cookie
    var str = document.cookie; // 先按照; 来切开每一条cookie

    var arr = str.split('; ');
    console.log(arr); // arr的每一个item就是一条cookie，再把item按照=来切割，把属性名和属性值分开

    var obj = {};
    arr.forEach(function (item) {
      var subArr = item.split('='); // subArr是切开之后的数组，这个数组的第0个元素是属性名，第一个元素是属性值

      console.log(subArr); // subArr[0] 这个整体作为obj的属性名，这里不能用. 只能用中括号
      // subArr[1]是编码之后的属性值，解码之后赋值

      obj[subArr[0]] = decodeURIComponent(subArr[1]);
    });
    console.log(obj);
    return obj[key];
  },

  /** 存cookie
   * @param key       <string> cookie的名称
   * @param value     <string> cookie的值
   * @param [options] <object> path和expires参数，例如：{ expires: 7, path: '/' } 指的是7天过期存根目录
   */
  setCookie: function setCookie(key, value, options) {
    // 给value编码再存
    var str = "".concat(key, "=").concat(encodeURIComponent(value));

    if (options) {
      // 先判断options是否传递了
      if (options.expires) {
        // 设置过期时间
        var date = new Date();
        date.setDate(date.getDate() + options.expires);
        str += ";expires=".concat(date.toUTCString());
      }

      if (options.path) {
        // 设置路径
        str += ";path=".concat(options.path);
      }
    } // 把拼接好的字符串存cookie


    document.cookie = str;
  },

  /** ajax get请求
   * @param url      <string>   请求的路径
   * @param query    <object>   请求要携带的参数
   * @param fn       <function> 请求成功以后的回调函数
   * @param [isJson] <boolean>  请求返回的数据是否是json格式，默认为true
   */
  get: function get(url, query, fn) {
    var isJson = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    // isJson = true ES6新语法，参数默认值，如果参数不传，参数默认值就是true
    // 如果有参数，先再url后面把参数拼接上
    if (query) {
      url += '?'; // 遍历query，把每一个属性都拼接再url后面

      for (var key in query) {
        url += "".concat(key, "=").concat(query[key], "&");
      } // 拼接完成以后多出一个&


      url = url.slice(0, -1); // 从0开始截取到倒数第一个结束，只保留了除最后一个&以外的字符串
    }

    var xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // 请求成功
          // 根据isJson来决定是否转换
          var data = isJson ? JSON.parse(xhr.responseText) : xhr.responseText; // 调用fn的时候把后端返回的数据作为参数传进去

          fn && fn(data);
        } else {
          alert('请求失败，状态码为：' + xhr.status);
        }
      }
    };
  },

  /** ajax post请求
   * @param url      <string>   请求的路径
   * @param query    <object>   请求要携带的参数
   * @param fn       <function> 请求成功以后的回调函数
   * @param [isJson] <boolean>  请求返回的数据是否是json格式，默认为true
   */
  post: function post(url, query, fn) {
    var isJson = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var str = '';

    if (query) {
      for (var key in query) {
        str += "".concat(key, "=").concat(query[key], "&");
      }

      str = str.slice(0, -1);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('post', url);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(str);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
          fn && fn(data);
        }
      }
    };
  },

  /** 发送jsonp请求
   * 
   * @param url     <string>  接口的路径
   * @param cbName  <string>  回调函数名
   * @param [query] <object>  其他的一些参数
   */
  jsonp: function jsonp(url, cbName, query) {
    // 创建script标签
    url += "?cb=".concat(cbName);

    if (query) {
      for (var key in query) {
        url += "&".concat(key, "=").concat(query[key]);
      }
    }

    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script); // 一旦script存在，请求就发出去了，script就没用了，可以直接删掉

    document.body.removeChild(script); // 过河拆桥
  },

  /** 基于promise的ajax get请求
   * @param url      <string>   请求的路径
   * @param query    <object>   请求要携带的参数
   * @param [isJson] <boolean>  请求返回的数据是否是json格式，默认为true
   * 
   */
  fetch: function fetch(url, query) {
    var isJson = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (query) {
      url += '?'; // 遍历query，把每一个属性都拼接再url后面

      for (var key in query) {
        url += "".concat(key, "=").concat(query[key], "&");
      } // 拼接完成以后多出一个&


      url = url.slice(0, -1); // 从0开始截取到倒数第一个结束，只保留了除最后一个&以外的字符串
    } // 在这里需要把promise return出去，这样将来调用这个方法才能.then


    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url);
      xhr.send();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(isJson ? JSON.parse(xhr.responseText) : xhr.responseText);
          } else {
            reject();
          }
        }
      };
    });
  }
}; // 设置cookie

function setCookie(options) {
  if (!options.key || !options.val) {
    throw new Error('设置失败，key和val是必填参数！');
  }

  options.domain = options.domain || '';
  options.path = options.path || '';
  options.days = options.days || 0;

  if (options.days !== 0) {
    var d = new Date();
    d.setDate(d.getDate() + options.days);
    document.cookie = options.key + '=' + escape(options.val) + '; domain=' + options.domain + '; path=' + options.path + '; expires=' + d;
  } else {
    document.cookie = options.key + '=' + escape(options.val) + '; domain=' + options.domain + '; path=' + options.path;
  }
} // 获取cookie


function getCookie(key) {
  var arr1 = document.cookie.split('; '); //所有cookie分割出来的数组

  var arr2 = []; //每一个cookie分割出来的key和value

  for (var i = 0, len = arr1.length; i < len; i++) {
    arr2 = arr1[i].split('=');

    if (arr2[0] === key) {
      return unescape(arr2[1]);
    }
  }

  return null;
} // 删除cookie


function removeCookie(key) {
  setCookie({
    key: key,
    val: '1234',
    days: -2
  });
} // 判断是否为对象{}


function isObject(obj) {
  if (_typeof(obj) === 'object' && obj !== null && obj.constructor === Object) {
    return true;
  }

  return false;
}

function ajax(options) {
  // 1.创建XMLHttpRequest对象（数据交互对象）
  var xhr = new XMLHttpRequest(); //w3c标准
  // var xhr = new ActiveXObject('Microsoft.XMLHTTP');//IE 5 6

  var data = '';

  if (typeof options.data === 'string') {
    data = options.data;
  }

  if (isObject(options.data)) {
    // 把{abc:123,ddd:777} 转成 'abc=123&ddd=777'
    for (var key in options.data) {
      data += key + '=' + options.data[key] + '&';
    } // data = 'abc=123&ddd=777&';


    data = data.substring(0, data.length - 1); // console.log(data);
  } // return;
  // 判断请求方式


  if (options.type.toLowerCase() === 'get') {
    xhr.open(options.type, options.url + '?' + data + '&_=' + Date.now(), true);
    xhr.send(null); // get请求
  } else if (options.type.toLowerCase() === 'post') {
    xhr.open(options.type, options.url, true); // 作用是模拟表单post来传递参数

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data); // post请求发送数据 
  } else {
    alert('目前只支持 get和post 请求！');
  } // 4.请求-响应 状态


  xhr.onreadystatechange = function () {
    // console.log(xhr.readyState);
    if (xhr.readyState == 4) {
      //请求完成 （请求状态）
      if (xhr.status >= 200 && xhr.status < 300) {
        // 得到响应数据 （响应状态）
        options.success(xhr.responseText);
      } else {
        options.error(xhr.status);
      }
    }
  };
}

function jsonp(options) {
  // 把options.success函数声明为全局函数 'mycallback'
  window[options.callbackName] = options.success; // 判断参数，如果是字符串，直接赋值给data

  var data = '';

  if (typeof options.data === 'string') {
    data = options.data;
  } // 判断参数，如果是对象，把对象格式化成参数序列的字符串再赋值给data


  if (_typeof(options.data) === 'object' && options.data !== null && options.data.constructor === Object) {
    // 把{abc:123,ddd:777} 转成 'abc=123&ddd=777'
    for (var key in options.data) {
      data += key + '=' + options.data[key] + '&';
    } // data = 'abc=123&ddd=777&';


    data = data.substring(0, data.length - 1);
  } // 创建script标签，并且给src属性赋值（数据地址、参数、参数值）


  var Script = document.createElement('script');
  Script.src = options.url + '?' + options.cb + '=' + options.callbackName + '&' + data;
  document.body.appendChild(Script); // script标签加载完成时，删除该标签

  Script.onload = function () {
    document.body.removeChild(Script);
  };
} // 使用Promise封装ajax


function promiseAjax(options) {
  return new Promise(function (resolve, reject) {
    // 1.创建XMLHttpRequest对象（数据交互对象）
    var xhr = new XMLHttpRequest(); //w3c标准
    // var xhr = new ActiveXObject('Microsoft.XMLHTTP');//IE 5 6

    var data = '';

    if (typeof options.data === 'string') {
      data = options.data;
    }

    if (_typeof(options.data) === 'object' && options.data !== null && options.data.constructor === Object) {
      // 把{abc:123,ddd:777} 转成 'abc=123&ddd=777'
      for (var key in options.data) {
        data += key + '=' + options.data[key] + '&';
      } // data = 'abc=123&ddd=777&';


      data = data.substring(0, data.length - 1); // console.log(data);
    } // return;
    // 判断请求方式


    if (options.type.toLowerCase() === 'get') {
      xhr.open(options.type, options.url + '?' + data + '&_=' + Date.now(), true);
      xhr.send(null); // get请求
    } else if (options.type.toLowerCase() === 'post') {
      xhr.open(options.type, options.url, true); // 作用是模拟表单post来传递参数

      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(data); // post请求发送数据 
    } else {
      alert('目前只支持 get和post 请求！');
    } // 4.请求-响应 状态


    xhr.onreadystatechange = function () {
      // console.log(xhr.readyState);
      if (xhr.readyState == 4) {
        //请求完成 （请求状态）
        if (xhr.status >= 200 && xhr.status < 300) {
          // 得到响应数据 （响应状态）
          resolve(xhr.responseText);
        } else {
          reject(xhr.status);
        }
      }
    };
  });
}