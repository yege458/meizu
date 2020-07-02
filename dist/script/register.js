"use strict";

window.onload = function () {
  var user = document.querySelector('.inp1 input');
  var pwd = document.querySelector('.inp2 input');
  var check = document.querySelector('.check');
  var submit = document.querySelector('.inp4');

  submit.onclick = function () {
    if (check.checked) {
      ajax({
        type: 'get',
        url: 'http://localhost/wamproot/twojieduan/zhuxian/src/php/user.php',
        data: {
          type: 'register',
          user: user.value,
          pwd: pwd.value
        },
        success: function success(data) {
          var json = JSON.parse(data);
          alert(json.msg);
          window.location.href = '../html/index.html';
        }
      });
    }
  };
};