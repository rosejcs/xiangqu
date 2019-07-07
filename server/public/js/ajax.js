
function ajax({ url, type, data, dataType }) {
  // type               get         /     post
  // url        ".../products?pid="或者".../product"
  // data               1          或者"uname=tom&upwd=123"
  // dataType   JSON/XML
  return new Promiss(function (open, err) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (dataType != undefined && dataType.toLowerCase() == "json") {
            var result = JSON.parse(xhr.responseText);
          } else {
            var result = xhr.responseXML;
          }
          open(result);
        }
        if (type.toLowerCase() == "get" && data != undefined) {
          // 实例:用户输入url="http://127.0.0.1/product?gid="
          url += "?" + data;
        }
        xhr.open(type, url, true);
        if(type.toLowerCase()==="post"){
          //增加: 设置请求消息头
          xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        }
        // 4:发送请求
        if(type.toLowerCase()=="post" && data!=undefined) {
          xhr.send(data);
        }else {
          xhr.send(null);
        }
      }
  });
}