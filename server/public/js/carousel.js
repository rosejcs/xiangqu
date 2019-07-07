/**
   * 顶部轮播图 .priCarousel 原生DOM
   */
function priCarousel(){
  var priCarousel = document.querySelector(".floor1 .priCarousel");
  var priCarBox = document.querySelector(".floor1 .priCarousel .carouselItems");
  var priCarItem = priCarBox.children[0];
  var controlPrev = document.querySelector(".floor1 .priCarousel .prev");
  var controlNext = controlPrev.nextElementSibling;
  var inditorCars = document.querySelectorAll(".carouselIndicators li");
  // console.log(controlPrev);
  priCarousel.onmouseover = function () {
    clearInterval(timer);
  };
  priCarousel.onmouseout = function () {
    timer = setInterval(autoPlay, 4000);
  };
  // inditor指示器函数
  for (let i = 0, len = inditorCars.length; i < len; i++) {
    inditorCars[i].onclick = function () {
      for (var j = 0, len = inditorCars.length; j < len; j++) {
        inditorCars[j].className = "";
      }
      inditorCars[i].className += " active";
      count = i;
      autoPlay();
    };
  }

  // control控制器函数
  controlPrev.onclick = function () {
    // if (count == 0) {
    //   count = 5;
    //   priCarBox.style.transform = "translateX(-" + itemWidth * (count + 1) + "px)";
    //   priCarBox.style.transition = "all 0s linear";
    // }

    // console.log(count);
    count--;
    // priCarBox.style.transition = "all .8s linear";
    priCarBox.style.transform = "translateX(-" + itemWidth * count + "px)";
    // console.log(count);
    if (count == 0) {
      count = 5;
      // console.log(count);
      setTimeout(fn, 800);
    }

    function fn() {
      priCarBox.style.transition = "all 0s linear";
      priCarBox.style.transform = "translateX(-" + itemWidth * 5 + "px)";
    }

    priCarBox.style.transition = "all .8s linear";

    // 指示器部分
    for (var i = 0; i < inditorCars.length; i++) {
      inditorCars[i].className = "";
      inditorCars[count - 1].className += " active";
    }
  };

  controlNext.onclick = function () {
    autoPlay();
  };

  // 动画函数
  var timer, step, itemWidth, count;
  count = 1;
  itemWidth = priCarItem.offsetWidth;
  timer = setInterval(autoPlay, 4000);
  priCarBox.style.transition = "all .8s linear";

  function autoPlay() {
    // if (count === 1) {
    //   //初始化过渡时间,('1'跳转回1会设置过渡时间为0s,所以这里还有重设过渡时间的作用)
    //   priCarBox.style.transition = "all .8s linear";
    // }
    count++;
    // console.log(count);
    step = itemWidth * count;
    priCarBox.style.transform = "translateX(-" + step + "px)";
    if (count === 6) {
      // 当count=6时,当前位置为"1",瞬间跳转到1,2d转换不带过渡,并且将count设置为1,重新从1开始播放轮播
      count = 1;
      // console.log(count);
      setTimeout(fn, 800);
    }

    function fn() {
      priCarBox.style.transition = "all 0s linear 0s";
      priCarBox.style.transform = "translateX(-" + itemWidth + "px)";
    }
    //初始化过渡时间,('1'跳转回1会设置过渡时间为0s,所以这里还有重设过渡时间的作用)
    priCarBox.style.transition = "all .8s linear";

    // 指示器部分
    for (var i = 0; i < inditorCars.length; i++) {
      inditorCars[i].className = "";
      inditorCars[count - 1].className += " active";
    }
  }
};








/**
 * 顶部轮播图 .priCarousel 原生DOM
 */
/* (function () {
  var priCarousel = document.querySelector(".floor1 .priCarousel");
  var priCarBox = document.querySelector(".floor1 .priCarousel .carouselItems");
  var priCarItem = priCarBox.children[0];
  var controlPrev = document.querySelector(".floor1 .priCarousel .prev");
  var controlNext = controlPrev.nextElementSibling;
  var inditorCars = document.querySelectorAll(".carouselIndicators li");
  // console.log(controlPrev);
  priCarousel.onmouseover = function () {
    clearInterval(timer);
  };
  priCarousel.onmouseout = function () {
    timer = setInterval(autoPlay, 4000);
  };
  // inditor指示器函数
  for (let i = 0, len = inditorCars.length; i < len; i++) {
    inditorCars[i].onclick = function () {
      for (var j = 0, len = inditorCars.length; j < len; j++) {
        inditorCars[j].className = "";
      }
      inditorCars[i].className += " active";
      count = i;
      autoPlay();
    };
  }

  // control控制器函数
  controlPrev.onclick = function () {
    // if (count == 0) {
    //   count = 5;
    //   priCarBox.style.transform = "translateX(-" + itemWidth * (count + 1) + "px)";
    //   priCarBox.style.transition = "all 0s linear";
    // }

    // console.log(count);
    count--;
    // priCarBox.style.transition = "all .8s linear";
    priCarBox.style.transform = "translateX(-" + itemWidth * count + "px)";
    // console.log(count);
    if (count == 0) {
      count = 5;
      // console.log(count);
      setTimeout(fn, 800);
    }

    function fn() {
      priCarBox.style.transition = "all 0s linear";
      priCarBox.style.transform = "translateX(-" + itemWidth * 5 + "px)";
    }

    priCarBox.style.transition = "all .8s linear";

    // 指示器部分
    for (var i = 0; i < inditorCars.length; i++) {
      inditorCars[i].className = "";
      inditorCars[count - 1].className += " active";
    }
  };

  controlNext.onclick = function () {
    autoPlay();
  };

  // 动画函数
  var timer, step, itemWidth, count;
  count = 1;
  itemWidth = priCarItem.offsetWidth;
  timer = setInterval(autoPlay, 4000);
  priCarBox.style.transition = "all .8s linear";

  function autoPlay() {
    // if (count === 1) {
    //   //初始化过渡时间,('1'跳转回1会设置过渡时间为0s,所以这里还有重设过渡时间的作用)
    //   priCarBox.style.transition = "all .8s linear";
    // }
    count++;
    // console.log(count);
    step = itemWidth * count;
    priCarBox.style.transform = "translateX(-" + step + "px)";
    if (count === 6) {
      // 当count=6时,当前位置为"1",瞬间跳转到1,2d转换不带过渡,并且将count设置为1,重新从1开始播放轮播
      count = 1;
      // console.log(count);
      setTimeout(fn, 800);
    }

    function fn() {
      priCarBox.style.transition = "all 0s linear 0s";
      priCarBox.style.transform = "translateX(-" + itemWidth + "px)";
    }
    //初始化过渡时间,('1'跳转回1会设置过渡时间为0s,所以这里还有重设过渡时间的作用)
    priCarBox.style.transition = "all .8s linear";

    // 指示器部分
    for (var i = 0; i < inditorCars.length; i++) {
      inditorCars[i].className = "";
      inditorCars[count - 1].className += " active";
    }
  }
})(); */