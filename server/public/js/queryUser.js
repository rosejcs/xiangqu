// 查询地址栏中携带的id,方便查询
// targetId是uid=12中12
// name是uid=12中uid
function queryUser(targetId,name){
  // 获取当前地址栏url中的uid
  var urlParams=new URLSearchParams(location.search);
  targetId = urlParams.get(name);
  console.log(name+":"+targetId);
  return targetId;
}