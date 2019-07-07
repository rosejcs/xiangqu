const express = require('express');
const pool = require('../pool.js');
var router = express.Router();

// 1.detail
router.get('/detail',(req,res)=>{
  var obj = req.query;
  var $gid = req.query.gid;
  if(!$gid) {
    res.send('gid is required');
    return;
  } 
  var sql = 'SELECT * FROM wg_good WHERE gid=?';
  pool.query(sql,[$gid],(err,result)=>{
    if(err) throw err;
    if(result.length > 0) {
      res.send(result);
    }else {
      res.send('0');
    }
  });
});


// 导出路由器
module.exports = router;