  $(function () {
    (function(){
      // 用户输入正则验证
      var regPhone = /^[0-9]{11,15}$/;
      var regPwd = /^[0-9a-zA-Z_]{6,20}$/;
      // function checkReg(reg) {
      //   if (reg.test($(this).val()))
      //     $(this).next().css("display", "block").next().css("display", "none");
      //   else
      //     $(this).next().css("display", "none").next().css("display", "block");
      // }
      // function isTruePh() {
      //   checkReg.call($(this),regPhone);
      // }
      // function isTruePw() {
      //   checkReg.call($(this),regPwd);
      // }
      // function isTrue(reg){
      //   checkReg.call($(this), reg);
      // }
      function isTrue(reg) {
        if (reg.test($(this).val()))
          $(this).next().css("display", "block").next().css("display", "none");
        else
          $(this).next().css("display", "none").next().css("display", "block");
      }
      $("#regContent input.phone")
        .focus(function () {
          isTrue.call($(this), regPhone);
        })
        .blur(function () {
          isTrue.call($(this), regPhone);
        });
      $("#regContent input.upwd")
        .focus(function () {
          isTrue.call($(this), regPwd);
        })
        .blur(function () {
          isTrue.call($(this), regPwd);
        });
      // ajax请求
      $("#regContent .reg").click(function () {
        var uphone = $("#regContent .phone").val(),
          upwd = $("#regContent .upwd").val();
        var data = "phone=" + uphone + "&pwd=" + upwd;
        $.ajax({
          url: "http://127.0.0.1:3000/user/reg",
          type: "post",
          data,
          dataType: "json"
        }).then(result => {
          console.log(result);
          // console.log(result.data[0].id);
          if(result.code==-2){
            alert("此号码已注册,请重新输入");
            return;
          }
          var uid = result.data[0].id;
          if (result.code == 1) {
            // window.location.href = "http://127.0.0.1:3000/index.html?uid=" + uid;
            window.open("http://127.0.0.1:3000/index.html?uid=" + uid);
          }
        });
      });
    })();
  });