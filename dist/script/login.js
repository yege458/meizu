"use strict";

window.onload = function () {
  var user = document.querySelector('.inp1 input');
  var pwd = document.querySelector('.inp2 input');
  var check = document.querySelector('.check');
  var submit = document.querySelector('.inp4');

  if (getCookie('user')) {
    user.value = getCookie('user');
    pwd.value = getCookie('pwd');
    check.checked = true;
  }

  submit.onclick = function () {
    if (user.value && pwd.value) {
      ajax({
        type: 'get',
        url: 'http://localhost/wamproot/twojieduan/zhuxian/src/php/user.php',
        data: {
          type: 'login',
          user: user.value,
          pwd: pwd.value
        },
        success: function success(data) {
          var json = JSON.parse(data);
          alert(json.msg);

          if (check.checked) {
            setCookie({
              key: 'user',
              val: user.value,
              days: 7
            });
            setCookie({
              key: 'pwd',
              val: pwd.value,
              days: 7
            });
          } else {
            removeCookie('user');
            removeCookie('pwd');
          }

          setCookie({
            key: 'bool',
            val: 'true',
            days: 7
          });
          window.location.href = '../html/index.html';
        }
      });
    }
  };
};