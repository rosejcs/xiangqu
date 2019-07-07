$(function () {
  (function () {
    
    
    
    // 验证用户名密码是不是写空了
    var notice = $(".container .wrapper1 .notice");
    $("input").blur(function () {
      var uphone = $(".phone").val();
      var upwd = $(".upwd").val();
      if (!uphone) {
        notice.css("display", "block").children(":first").css("display", "block");
        return;
      }
      if (!upwd) {
        notice.css("display", "block").children(".pwdNotice").css("display", "block");
        return;
      }
    });
    window.onclick = function () {
      setTimeout(disnone, 4000);

      function disnone() {
        notice.css("display", "none").children().css("display", "none");
      }
    };


    // 登录ajax start
    $(".user_msg .loginbtn .userlogin").click(function () {
      var uphone = $(".phone").val();
      var upwd = $(".upwd").val();
      var url = "http://127.0.0.1:3000/user/login?phone="+uphone+"&pwd="+upwd;
      $.ajax({
        url,
        type: "get",
        dataType: "json"
        // data,
      }).then(result => {
        console.log(result);
        if (result.code == -1) {
          // 返回-1,显示提示标签notice中的wrongNotice
          wrongNotice();
        }

        if (result.code == 1) {
          // 返回1,跳转首页index
          var uid = result.data[0].id;
          window.open("http://127.0.0.1:3000/index.html?uid=" + uid);
        }
        // 显示notice
        function wrongNotice() {
          notice.css("display", "block").children(":last").css("display", "block");
          return;
        }
      });
    });
    // 登录ajax end




  })();

});