// 引入express模块
const express = require('express');

// const the pool module for sql operation
const pool = require('../pool.js');

// 创建路由器
var router = express.Router();
// 添加路由

// 功能一:用户注册
// post /reg 用户注册请求路由
router.post('/reg', (req, res) => {
  var {phone,pwd} = req.body;
  var regPhone = /^[0-9]{11,15}$/; //11位-15位
  var regPwd = /^[0-9a-zA-Z_]{6,20}$/; //数字,字母,下划线
  if (!regPhone.test(phone)) {
    res.send({
      code: -1,
      msg: "wrong phone format"
    });
    return;
  }
  if (!regPwd.test(pwd)) {
    res.send({
      code: -1,
      msg: "wrong pwd format"
    });
    return;
  }
  // var sql = 'INSERT INTO user SET ?';
  // 给用户对象添加默认的头像,性别,和用户名
  var sqlinsert = "insert into user(phone,pwd,name,img_url) values(?,?,default,default)";
  var sqlthis = "select id,phone,name,img_url from user where phone=?";
  pool.query(sqlinsert, [phone, pwd], (err, result) => {
    if (err){
       res.send({code:-2,msg:"phone exists,retry..."});
       return;
    }
    if (result.affectedRows > 0) {
      pool.query(sqlthis, [phone], (err, result) => {
        if (err) throw err;
        res.send({
          code: 1,
          msg: "reg suc",
          data: result
        });
      });
    } else {
      res.send({
        code: -1,
        msg: 'reg err'
      });
    }
    // result.affectedRows > 0 ? res.send({code : 1, msg : 'reg suc'}) : res.send({code : -1, msg : 'reg err'});
  });
});

// 功能二:用户登录
// get /login 用户登录请求路由
router.get('/login', (req, res) => {
  var {phone,pwd} = req.query;
  console.log({phone,pwd});
  var sql ="SELECT id FROM user WHERE phone=? AND pwd=?"; 
  pool.query(sql, [phone,pwd], (err, result) => {
    if (err) throw err;
    // 返回结果数组为空即长度为0,则返回不存在该用户提示
    if (result.length > 0) {
      console.log(result);
      console.log(1);
      res.send({code:1,msg:"login success",data:result});
    } else { 
      console.log(-1);
      res.send({code:-1,msg:"wrong phone or password num,retry..."});
    }
  });
});



// 导出路由器router
module.exports = router;