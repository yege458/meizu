"use strict";

window.onload = function () {
  var ullist = document.querySelector('.lunbo');
  var lilist = document.querySelectorAll('.lunbo li');
  var imgs = document.querySelectorAll('.lunbo li img');
  var lunbo_btn = document.querySelector('.lunbo_btn');
  var head = document.querySelector('.head');
  var btns = document.querySelectorAll('.lunbo_btn li');
  var width = imgs[0].offsetWidth;
  var btns = [];
  var len = imgs.length;
  ullist.style.width = width * (imgs.length + 1) + 'px';
  var index = 0,
      lastIndex = 0;
  var isMove = false; // 创建ol里面的按钮

  for (var i = 0; i < len; i++) {
    var li = document.createElement('li');
    if (i === 0) li.className = 'ac';
    li.innerHTML = i + 1;
    lunbo_btn.appendChild(li); // btns放所有按钮的，所以每创建一个就push一个

    btns.push(li);
  } // ul里追加第0张图，克隆第0张然后追加


  ullist.appendChild(lilist[0].cloneNode(true)); // 深克隆
  // 计算ul的宽度

  ullist.style.width = (len + 1) * width + 'px';
  var left = ullist.style.left; // 给按钮绑事件，遍历btns给每一个btn都绑事件

  btns.forEach(function (btn, i) {
    btn.onclick = function () {
      if (!isMove) {
        isMove = true; // 下标index往前走一步

        lastIndex = index;
        index = i; // 根据修改之后的index和lastIndex来修改按钮样式

        btns[lastIndex].classList.remove('ac');
        btns[index].classList.add('ac');

        if (index === 5) {
          head.style.color = 'black';
        } else {
          head.style.color = "white";
        }

        utils.move1(ullist, 'left', -index * width, function () {
          isMove = false;
        });
      }
    };
  });

  function gonext() {
    if (!isMove) {
      isMove = true;
      lastIndex = index;
      index++;

      if (index % 5 === 0) {
        head.style.color = 'black';
      } else {
        head.style.color = "white";
      }

      if (index === len) {
        index = 0;
        utils.move1(ullist, 'left', -len * width, function () {
          ullist.style.left = '0px';
          isMove = false;
        });
      } else {
        utils.move1(ullist, 'left', -index * width, function () {
          isMove = false;
        });
      }

      btns[lastIndex].classList.remove('ac');
      btns[index].classList.add('ac');
    }
  }

  var timer = setInterval(gonext, 3000);

  ullist.onmouseenter = function () {
    clearInterval(timer);
  };

  ullist.onmouseleave = function () {
    timer = setInterval(gonext, 3000);
  }; //   var headli=document.querySelectorAll('.head li');
  //   var head=document.querySelector('.head');
  //   var header=document.querySelector('.header');
  //   var head_shouji=document.querySelector('.head_shouji');
  //   headli[0].onmouseover=function(){
  //         header.style.background="white";
  //         head_shouji.style.display="block";
  //         head.style.color="black";
  //   }
  //   headli[0].onmouseleave=function(){
  //       head_shouji.style.display="none";
  //       head.style.color="white";
  //   }


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
  var carnum = document.querySelector('.card p'); // if(getCookie('bool')){
  //     bool=getCookie('bool');

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
  }; // }


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
        login.innerHTML = "\n                <li><a href=\"../html/login.html\">\u7ACB\u5373\u767B\u5F55</a></li>\n                <li><a href=\"../html/register.html\">\u7ACB\u5373\u6CE8\u518C</a></li>\n                <li><a href=\"\">\u6211\u7684\u8BA2\u5355</a></li>\n                <li><a href=\"\">M\u7801\u901A\u9053</a></li>";
      }
    };
  }

  if (carnum.innerText == 0) {
    if (getCookie('bool')) {
      console.log(carnum.innerText);
      carlist.innerHTML = "\n            <img src=\"../images/xionmao.jpeg\" alt=\"\">\n            <p>\n                <span>\u60A8\u7684\u8D2D\u7269\u8F66\u8FD8\u6CA1\u6709\u5546\u54C1</span>\n                <span>\u8D76\u7D27\u53BB\u9009\u8D2D\u5427~</span>\n            </p>\n            ";
    }
  }
};