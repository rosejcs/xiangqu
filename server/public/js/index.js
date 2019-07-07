/* 登录跳转显示玩家信息 */
$(function () {
  (function () {
    var uid = '';
    // console.log(location.search);// ?uid=1
    // 查询浏览器地址栏中"?uid="的值,赋值给uid变量
    // queryUser(targetId,name)// 1
    uid = queryUser(uid, "uid");
    var loggTab = $("#mHeader .topNavbar .rightUser .loginReg .unlog");
    if (uid) {
      loggTab.addClass("hide").next().addClass("show");
    } else {
      loggTab.addClass("show").next().addClass("hide");
    }
  })();
});

/* 轮播图ajax请求 */
$(function () {
  (function () {
    // 发送ajax请求:
    $.ajax({
      url: "http://127.0.0.1:3000/index/carousel",
      type: "get",
      // data:,
      dataType: "json"
    }).then(result => {
      // console.log(result); //取得服务器返回的数据
      var res = result.data;
      // 设置字符串,准备将轮播图数据插入到页面中carousel==>crs
      var crs = "";
      for (var item of res) {
        // console.log(item.img_url);
        crs +=
          `<li>
        <a href="javascript:;">
          <img src="${item.img_url}">
        </a>
        </li>`;
      }
      $("ul.carouselItems").html(crs);
      // 轮播图动画效果
      priCarousel();
    });
  })();
});

/* 热卖推荐ajax请求 */
$(function () {
  (function () {
    $.ajax({
      url: "http://127.0.0.1:3000/index/hotsale",
      type: "get",
      dataType: "json"
    }).then(result => {
      // console.log(result.data);
      let res = result.data;
      // console.log(res);
      // 当前显示图片索引
      let count = 0;
      let hothtml = `<a href="javascript:;"> <img src=${res[count].img_url} /> </a>`;
      $("#mContentIndex .hotGood").html(hothtml);

      function change() {
        if (count == 5) {
          count = -1;
        }
        count++;
        hothtml = `<a href="javascript:;"> <img src=${res[count].img_url} /> </a>`;
        $("#mContentIndex .hotGood").html(hothtml);
      }
      setInterval(change, 20000);
    });
  })();
});

/* floor2 大家喜欢 */
$(function () {
  (function () {
    // ajax start
    var url = "http://127.0.0.1:3000/index/userlike"
    $.ajax({
      url,
      type: "get",
      // data
      dataType: "json"
    }).then(result => {
      var resData = [];
      if (result.code == 1) {
        // console.log(result.data);
        resData = result.data;
        // 用户小头像预告
        var resUHead = [];
        for (var item of resData) {
          resUHead.push(item.u_img);
        }
        // console.log(resUHead);
        var i = 0;
        setInterval(chuHead, 2000);

        function chuHead() {
          $(".backgroundBar .nextLiker img").attr("src", resUHead[i++]);
          if (i > resUHead.length) {
            i = 0;
          }
        }
        // 用户和对应喜欢的商品信息
        for (var item of resData) {
          var now = new Date();
          var temp = new Date(item.ltime);
          temp = now - temp;
          temp = temp / (3600 * 1000);
          item.ltime = temp;
        }
        // console.log(resData);
        var htmlStr = "";
        for (var i = 1; i < 12; i++) {
          into(i);
        }
        $(".userLike .likesCarousel").html(htmlStr);
      }

      function into(uid) {
        var arr = [];
        for (var item of resData) {
          if (item.uid == uid) {
            arr.push(item);
          }
        }
        htmlStr +=
          `<li class="likeCount${arr.length}">
          <div class="likerInfo">
            <a href="javascript:;">
            <img src="${arr[0].u_img}"/></a>
            <span class="likerName"><span>${arr[0].uname}</span></span>
            <p class="likeMsg">
              <span>${Math.round(arr[arr.length-1].ltime)}小时前</span><span></span><span><span class="likesCountNum">${arr.length}</span>个商品</span>
            </p>
          </div>
          <ul class="likeGoods">
          `;
        for (var i = 0; i < arr.length; i++) {
          htmlStr +=
            `<li>
              <a href="javascript:;"> <img src="${arr[i].g_img}"/></a>
            </li>`;
        }
        htmlStr +=
          `</ul>
          </li>`;
        // console.log(arr);
        // console.log(htmlStr);
      }
    });
    // ajax end
  })();
});

/* floor3 设计师品牌 */
$(function () {
  (function () {
    // ajax请求数据
    var params = {
      url: "http://127.0.0.1:3000/index/designbrand",
      type: "get",
      dataType: "json"
    };
    $.ajax(params).then(result => {
      var resData = [];
      if (result.code == 1)
        resData = result.data;
      var htmlStr = "";
      for (var item of resData) {
        htmlStr +=
          `<li>
          <div class="designerWrap">
            <a href="javascript:;" class="designerPic">
              <img src="${item.b_img}"/>
            </a>
            <a href="javascript:;" class="designerName">${item.brand}</a>
          </div>
        </li>`;
      }
      $(".designerShow").html(htmlStr);;
    });
  })();
});


/* floor4 手工艺人 */
$(function () {
  (function () {
    // 发送ajax请求
    var params = {
      url: "http://127.0.0.1:3000/index/handjober",
      type: "get",
      dataType: "json"
    };
    $.ajax(params).then(result => {
      var resData = [];
      var htmlStr = "";
      if (result.code == 1) {
        resData = result.data;
        for (var item of resData) {
          htmlStr +=
            `<li>
          <div class="handjobWrap">
            <a href="javascript:;" class="handjobPic">
              <img src=${item.h_img} alt="${item.name}" />
            </a>
            <a href="javascript:;" class="handjobName" title=${item.name}>
              <p>${item.name}</p>
              <span class="careCount">${item.care}</span>人关注<span class="linkIcon">
                <img src="./img/pc_new_icon.png" alt="" />
              </span>
            </a>
          </div>
        </li>`;
        }
        $(".handjobShow").html(htmlStr);
      }


    });
  })();
});


/* floor5 精选商品 */
// $(function(){
//   (function(){

//   })();
// });


/* floor6 好物推荐 */
$(function () {
  (function () {
    var params = {
      url: "http://127.0.0.1:3000/index/recommend",
      type: "get",
      dataType: "json"
    };
    // ajax请求
    $.ajax(params).then(result => {
      // console.log(result);
      var resData = [];
      var htmlStr = "";
      if (result.code == 1) {
        resData = result.data;
        htmlStr +=
          `<ul class="carouselBox">
            <li class="screen1">
              <ul>`;
        for (var i = 0; i < 12; i++) {
          htmlStr +=
            `<li>
              <a href="#">
                <p>${resData[i].classic}</p>
                <img src=${resData[i].r_img} alt="${resData[i].classic}">
              </a>
            </li>`;
        }
        htmlStr +=
          `</ul>
        </li>
        <li class="screen2">
          <ul>`;
        for (var i = 12; i < 24; i++) {
          htmlStr += `
          <li>
          <a href="#">
            <p>${resData[i].classic}</p>
            <img src=${resData[i].r_img} alt="${resData[i].classic}">
          </a>
          </li>
          `;
        }
        htmlStr +=
          `</ul>
        </li>
        </ul>`;
        $(".goodCarousel .carouselControl.prev").before(htmlStr);
      }
    });
  })();
});
/* floor7 猜你喜欢 */
$(function(){
  (function(){
    var params = {
      url:"http://127.0.0.1:3000/index/guess?pno=1",
      type:"get",
      dataType: "json"
    };
    // ajax请求
    $.ajax(params).then(result=>{
      // console.log(result);
      if(result.code==1){
        var resData=result.data;
        var htmlStr = "";
        for(var item of resData){
          htmlStr +=
          `<li>
            <a href="javascript:;">
            <img src="${item.img_url}" alt=""></a>
          </li>`;
        }
        $(".uLikeShow ul").html(htmlStr);
      }

    });
  })();
});


// $(function(){
//   (function(){

//   })();
// });
// $(function(){
//     (function(){

//     })();
//   });