"use strict";

window.onload = function () {
  var small_img = document.querySelectorAll('.small_img li img');
  var big_img = document.querySelectorAll('.big_img li img');
  var index = 0;
  var lastindex = 0;

  var _loop = function _loop(i, len) {
    small_img[i].onclick = function () {
      lastindex = index;
      index = i;
      big_img[lastindex].classList.remove('ac');
      big_img[index].classList.add('ac');
    };
  };

  for (var i = 0, len = small_img.length; i < len; i++) {
    _loop(i, len);
  }

  var person = document.querySelector('.person');
  var login = document.querySelector('.login');

  person.onmouseenter = function () {
    login.style.display = "block";

    login.onmouseenter = function () {
      login.style.display = "block";
    };

    login.onmouseleave = function () {
      login.style.display = "none";
    };

    person.onmouseleave = function () {
      login.style.display = "none";
    };
  };

  var bool = null;
  var icons = document.querySelectorAll('.person i');
  var login = document.querySelector('.login');
  var car = document.querySelector('.card i');
  var carlist = document.querySelector('.car');
  var carnum = document.querySelector('.card p');

  car.onmouseenter = function () {
    carlist.style.display = 'block';

    carlist.onmouseenter = function () {
      carlist.style.display = 'block';

      carlist.onmouseleave = function () {
        carlist.style.display = 'none';
      };
    };

    car.onmouseleave = function () {
      carlist.style.display = 'none';
    };
  };

  if (getCookie('bool')) {
    icons[0].classList.remove('ab');
    icons[1].classList.add('ab');
    login.innerHTML = "\n        <li><a href=\"javascript:;\">\u4E2A\u4EBA\u4E2D\u5FC3</a></li>\n        <li><a href=\"javascript:;\">\u6211\u7684\u8BA2\u5355</a></li>\n        <li><a href=\"javascript:;\">M\u7801\u901A\u9053</a></li>\n        <li><a class=\"exit\" href=\"javascript:;\">\u9000\u51FA\u767B\u5F55</a></li>\n        ";

    login.onclick = function (e) {
      e = e || window.event;

      if (e.target.tagName == 'A' && e.target.className == 'exit') {
        removeCookie('bool');
        icons[1].classList.remove('ab');
        icons[0].classList.add('ab');
        login.innerHTML = "\n                <li><a href=\"../html/login.html\">\u7ACB\u5373\u767B\u5F55</a></li>\n                <li><a href=\"../html/register.html\">\u7ACB\u5373\u6CE8\u518C</a></li>\n                <li><a href=\"\">\u6211\u7684\u8BA2\u5355</a></li>\n                <li><a href=\"\">M\u7801\u901A\u9053</a></li>\n        ";
      }
    };
  }

  if (carnum.innerText == 0) {
    if (getCookie('bool')) {
      console.log(carnum.innerText);
      carlist.innerHTML = "\n            <img src=\"../images/xionmao.jpeg\" alt=\"\">\n            <p>\n                <span>\u60A8\u7684\u8D2D\u7269\u8F66\u8FD8\u6CA1\u6709\u5546\u54C1</span>\n                <span>\u8D76\u7D27\u53BB\u9009\u8D2D\u5427~</span>\n            </p>\n            ";
    }
  }

  var phone = document.querySelectorAll('.cart_phone1 span');
  var color = document.querySelectorAll('.cart_phone3 span');
  var neicun = document.querySelectorAll('.cart_phone4 span');
  var taocan = document.querySelectorAll('.cart_phone5 span');
  var fenqi = document.querySelectorAll('.cart_phone6 span');
  var add = document.querySelector('.jia');
  var cut = document.querySelector('.jian');
  var sum = document.querySelector('.cart_phone7 input');
  var buy = document.querySelector('.buy');
  var cartadd = document.querySelector('.cartadd');
  console.log(phone[1].innerText);
  console.log(color[1].innerText);
  console.log(neicun[1].innerText);
  console.log(taocan[1].innerText);
  console.log(fenqi[1].innerText);

  buy.onclick = function () {
    ajax({
      type: 'get',
      url: 'http://localhost/wamproot/twojieduan/zhuxian/src/php/cart.php',
      data: {
        // phone:phone[1].innerText,
        // color:color[1].innerText,
        // neicun:neicun[1].innerText,
        // taocan:taocan[1].innerText,
        // fenqi:fenqi[1].innerText
        id: 1
      },
      success: function success(data) {
        var json = data;
        alert(json.msg);
      }
    });
  };
};