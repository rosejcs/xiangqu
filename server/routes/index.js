// 1:require modules express, pool
const express = require('express');
const pool = require('../pool.js');
// 2:create router
var router = express.Router();
// 3:create routes
// 3.1: primary carousel of index
// 功能一:首页顶部轮播图
// http://127.0.0.1:3000/index/carousel?cid=1
router.get('/carousel', (req, res) => {
  // 请求轮播图id到数据库查询对应的图片地址
  // var cid = req.query.cid;
  var sql = "SELECT id,img_url,gid";
  sql += " FROM index_carousel";
  pool.query(sql, [], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      res.send({
        code: 1,
        data: result
      });
    } else {
      res.send({
        code: -1,
        msg: "sorry"
      });
    }
  });
});


// 功能二:首页轮播旁边热卖推荐
router.get('/hotsale', (req, res) => {
  var sql = "select id,img_url,gid from hot_sale";
  pool.query(sql, [], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({
        code: 1,
        data: result
      });
    } else {
      res.send({
        code: -1,
        msg: "sorry"
      });
    }
  });
});


// 功能三:大家喜欢
router.get("/userlike", (req, res) => {
  // 从likes l 取id,uid,gid
  // 从good_img g 取img_url
  // 从user u 取img_url name
  var sql = `
  SELECT l.id,l.uid,l.gid,l.ltime,g.img_url g_img,u.img_url u_img,u.name uname
  FROM likes l,good_img g,user u
  WHERE l.gid=g.gid AND l.uid=u.id
  ORDER BY l.uid
  `;
  pool.query(sql,[],(err,result)=>{
    if(err)throw err;
    if(result.length>0)
      res.send({code:1,data:result});
    else
      res.send({code:-1,msg:"failed"});
  });
});

// 功能四:设计师品牌
router.get("/designbrand", (req,res)=>{
  var sql = "select id,did,brand,b_img from design_brand";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    if(result.length>0){
      res.send({code:1,data:result});
    }else{
      res.send({code:-1,msg:"failed"});
    }
  });
});

// 功能五:手工艺人
router.get("/handjober",(req,res)=>{
  var sql = "select id,sid,name,care,h_img from hand_jober";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    if(result.length>0)
      res.send({code:1,data:result});
    else
      res.send({code:-1,msg:"failed"});
  });
});

// 功能六:好物推荐
router.get("/recommend",(req,res)=>{
  var sql = "select id,gid,classic,r_img from recommend";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    if(result.length>0)
    res.send({code:1,data:result});
    else
    res.send({code:-1,msg:"failed"});
  });
})

// 功能七:猜你喜欢
router.get("/guess",(req,res)=>{
  var pno = req.query.pno;
  if(!pno) pno=1;
  var sql = "select id,gid,img_url from good_img limit ?,7";
  var offset = (pno-1)*7;
  pool.query(sql,[offset],(err,result)=>{
    if(err)throw err;
    if(result.length>0)
    res.send({code:1,data:result});
    else
    res.send({code:-1,msg:"failed"});
  });
});













// 4:module exports
module.exports = router;