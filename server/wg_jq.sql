# 设置客户端向浏览器端的编码格式
SET NAMES UTF8;
# 丢弃数据库如果存在wg_jq
DROP DATABASE IF EXISTS wg_jq;
# 创建数据库wg_jq,编码格式utf8
CREATE DATABASE wg_jq CHARSET=UTF8;
# 进入数据库
USE wg_jq;




-- 用户表格 start --
-- 用户信息表 user --
create table user(
  id        int primary key auto_increment,
  uid       int,#用户id
  phone     varchar(15) UNIQUE,-- 086-12345678901
  pwd       varchar(20),-- /^[a-z0-9_]{6,20}$/i
  gender    bool default null,--性别 0,1
  name      varchar(12) default "亲",--用户名
  img_url   varchar(64) default "./img/user/head/default.jpg",--头像  "./img/user..."
);
drop table user;
create table user(
  id        int primary key auto_increment,
  uid       int,#用户id
  phone     varchar(15) UNIQUE,
  pwd       varchar(20),
  gender    bool default null,
  name      varchar(12) default "匿名的亲",
  img_url   varchar(64) default "./img/user/head/default.jpg");
-- 插入数据
-- id, phone, pwd, gen, name, img_url     
insert into user values
(null,01, "15812345600", "123456", default, default, default),
(null,02, "15812345601", "123456", 0, "aee", "./img/user/head/head (1).jpg"),
(null,03, "15812345602", "123456", 1, "bee", "./img/user/head/head (2).jpg"),
(null,04, "15812345603", "123456", 0, "cee", "./img/user/head/head (3).jpg"),
(null,05, "15812345604", "123456", 1, "dee", "./img/user/head/head (4).jpg"),
(null,06, "15812345605", "123456", 0, "eee", "./img/user/head/head (5).jpg"),
(null,07, "15812345606", "123456", 1, "fee", "./img/user/head/head (6).jpg"),
(null,08, "15812345607", "123456", 0, "gee", "./img/user/head/head (7).jpg"),
(null,09, "15812345608", "123456", 1, "hee", "./img/user/head/head (8).jpg"),
(null,10, "15812345609", "123456", 0, "iee", "./img/user/head/head (9).jpg"),
(null,11, "15812345610", "123456", 1, "jee", "./img/user/head/head (10).jpg"),
(null,12, "15812345611", "123456", 1, "kee", "./img/user/head/head (11).jpg"),
(null,13, "15812345612", "123456", 1, "lee", "./img/user/head/head (12).jpg"),
(null,14, "15812345613", "123456", 1, "mee", "./img/user/head/head (13).jpg"),
(null,15, "15812345614", "123456", 1, "nee", "./img/user/head/head (14).jpg"),
(null,16, "15812345615", "123456", 1, "oee", "./img/user/head/head (15).jpg"),
(null,17, "15812345616", "123456", 1, "pee", "./img/user/head/head (16).jpg"),
(null,18, "15812345617", "123456", 1, "qee", "./img/user/head/head (17).jpg"),
(null,19, "15812345618", "123456", 1, "ree", "./img/user/head/head (18).jpg"),
(null,20, "15812345619", "123456", 1, "see", "./img/user/head/head (19).jpg"),
(null,21, "15812345620", "123456", 1, "tee", "./img/user/head/head (20).jpg"),
(null,22, "15812345621", "123456", 1, "uee", "./img/user/head/head (21).jpg"),
(null,23, "15812345622", "123456", 1, "vee", "./img/user/head/head (22).jpg"),
(null,24, "15812345623", "123456", 1, "wee", "./img/user/head/head (23).jpg"),
(null,25, "15812345624", "123456", 1, "xee", "./img/user/head/head (24).jpg"),
(null,26, "15812345625", "123456", 1, "yee", "./img/user/head/head (25).jpg"),
(null,27, "15812345626", "123456", 1, "zee", "./img/user/head/head (26).jpg");

-- index页面的数据库表格 start
-- 首页表格 start --
# 创建表格轮播图 index_carousel START
drop table index_carousel;
CREATE TABLE index_carousel(
  # 轮播图中的id
  id INT PRIMARY KEY AUTO_INCREMENT,
  # 路径
  img_url VARCHAR(64),
  # 对应商品表products的id
  gid INT
);
INSERT INTO index_carousel VALUES
(NULL,"./img/index/primary_carousel/carousel5.jpg",105),
(NULL,"./img/index/primary_carousel/carousel1.jpg",101),
(NULL,"./img/index/primary_carousel/carousel2.jpg",102),
(NULL,"./img/index/primary_carousel/carousel3.jpg",103),
(NULL,"./img/index/primary_carousel/carousel4.jpg",104),
(NULL,"./img/index/primary_carousel/carousel5.jpg",105),
(NULL,"./img/index/primary_carousel/carousel1.jpg",101);
# 创建表格轮播图 index_carousel END

-- 热卖商品表,轮播图旁边的那张图hot_sale
drop table hot_sale;
create table hot_sale(
  id        int primary key auto_increment,
  img_url   varchar(64),
  gid       int
);
-- 插入数据到hot_sale表
insert into hot_sale values
(null,"./img/index/hot_sale/hot_sale1.jpg",111),
(null,"./img/index/hot_sale/hot_sale2.jpg",112),
(null,"./img/index/hot_sale/hot_sale3.jpg",113),
(null,"./img/index/hot_sale/hot_sale4.jpg",114),
(null,"./img/index/hot_sale/hot_sale5.jpg",115),
(null,"./img/index/hot_sale/hot_sale6.jpg",116);

-- 大家喜欢表格 likes
-- 添加到一个喜欢表,通过user表和good表查询相应的数据
-- 通过用户id来分组
-- 商品喜欢信息like
drop table likes;
create table likes(
  id        int primary key auto_increment,
  ltime     datetime,#喜欢的时间
  uid       int,#喜欢这商品的用户id
  gid       int,#商品id
  likecount int default 1,#被喜欢数量
  saycount  int#被评论数量
  -- uimg_url      varchar(64),#用户头像,从user表中拿
  -- name      varchar(16),#用户姓名,从user表拿
  -- gimg_url   varchar(64),#图片路径,从good_img表拿
);

-- id time uid gid lc sc
insert into likes values
(null,now(),1,10001,default,null),
(null,now(),1,10002,default,null),
(null,now(),1,10003,default,null),
(null,now(),1,10004,default,null),
(null,now(),2,10005,default,null),
(null,now(),2,10006,default,null),
(null,now(),2,10007,default,null),
(null,now(),3,10008,default,null),
(null,now(),3,10009,default,null),
(null,now(),4,10010,default,null),
(null,now(),5,10011,default,null),
(null,now(),5,10012,default,null),
(null,now(),5,10013,default,null),
(null,now(),5,10014,default,null),
(null,now(),6,10015,default,null),
(null,now(),6,10016,default,null),
(null,now(),6,10017,default,null),
(null,now(),7,10018,default,null),
(null,now(),7,10019,default,null),
(null,now(),8,10020,default,null),
(null,now(),9,10021,default,null),
(null,now(),9,10022,default,null),
(null,now(),9,10023,default,null),
(null,now(),9,10024,default,null),
(null,now(),10,10025,default,null),
(null,now(),10,10026,default,null),
(null,now(),10,10027,default,null),
(null,now(),11,10027,default,null),
(null,now(),11,10028,default,null),
(null,now(),11,10029,default,null),
(null,now(),12,10030,default,null),
(null,now(),12,10031,default,null),
(null,now(),13,10032,default,null),
(null,now(),14,10033,default,null),
(null,now(),14,10034,default,null),
(null,now(),14,10035,default,null),
(null,now(),14,10036,default,null),
(null,now(),15,10037,default,null),
(null,now(),15,10038,default,null),
(null,now(),15,10039,default,null),
(null,now(),16,10040,default,null),
(null,now(),16,10041,default,null),
(null,now(),17,10042,default,null);


-- 商品表good_img
create table good_img(
  id        int primary key auto_increment,
  gid       int,#商品id
  img_url   varchar(64),#图片路径
  sm        varchar(64),
  md        varchar(64),
  lg        varchar(64),
);
-- 插入
insert into good_img values
(null,10001,"./img/good/good (1).jpg",null,null,null),
(null,10002,"./img/good/good (2).jpg",null,null,null),
(null,10003,"./img/good/good (3).jpg",null,null,null),
(null,10004,"./img/good/good (4).jpg",null,null,null),
(null,10005,"./img/good/good (5).jpg",null,null,null),
(null,10006,"./img/good/good (6).jpg",null,null,null),
(null,10007,"./img/good/good (7).jpg",null,null,null),
(null,10008,"./img/good/good (8).jpg",null,null,null),
(null,10009,"./img/good/good (9).jpg",null,null,null),
(null,10010,"./img/good/good (10).jpg",null,null,null),
(null,10011,"./img/good/good (11).jpg",null,null,null),
(null,10012,"./img/good/good (12).jpg",null,null,null),
(null,10013,"./img/good/good (13).jpg",null,null,null),
(null,10014,"./img/good/good (14).jpg",null,null,null),
(null,10015,"./img/good/good (15).jpg",null,null,null),
(null,10016,"./img/good/good (16).jpg",null,null,null),
(null,10017,"./img/good/good (17).jpg",null,null,null),
(null,10018,"./img/good/good (18).jpg",null,null,null),
(null,10019,"./img/good/good (19).jpg",null,null,null),
(null,10020,"./img/good/good (20).jpg",null,null,null),
(null,10021,"./img/good/good (21).jpg",null,null,null),
(null,10022,"./img/good/good (22).jpg",null,null,null),
(null,10023,"./img/good/good (23).jpg",null,null,null),
(null,10024,"./img/good/good (24).jpg",null,null,null),
(null,10025,"./img/good/good (25).jpg",null,null,null),
(null,10026,"./img/good/good (26).jpg",null,null,null),
(null,10027,"./img/good/good (27).jpg",null,null,null),
(null,10028,"./img/good/good (28).jpg",null,null,null),
(null,10029,"./img/good/good (29).jpg",null,null,null),
(null,10030,"./img/good/good (30).jpg",null,null,null),
(null,10031,"./img/good/good (31).jpg",null,null,null),
(null,10032,"./img/good/good (32).jpg",null,null,null),
(null,10033,"./img/good/good (33).jpg",null,null,null),
(null,10034,"./img/good/good (34).jpg",null,null,null),
(null,10035,"./img/good/good (35).jpg",null,null,null),
(null,10036,"./img/good/good (36).jpg",null,null,null),
(null,10037,"./img/good/good (37).jpg",null,null,null),
(null,10038,"./img/good/good (38).jpg",null,null,null),
(null,10040,"./img/good/good (40).jpg",null,null,null),
(null,10041,"./img/good/good (41).jpg",null,null,null),
(null,10042,"./img/good/good (42).jpg",null,null,null),
(null,10043,"./img/good/good (43).jpg",null,null,null),
(null,10044,"./img/good/good (44).jpg",null,null,null),
(null,10045,"./img/good/good (45).jpg",null,null,null),
(null,10046,"./img/good/good (46).jpg",null,null,null),
(null,10047,"./img/good/good (47).jpg",null,null,null),
(null,10048,"./img/good/good (48).jpg",null,null,null),
(null,10049,"./img/good/good (49).jpg",null,null,null),
(null,10050,"./img/good/good (50).jpg",null,null,null);
-- index页面的数据库表格 end

-- 商品具体内容表good_info
create table good_info(
  -- gid       int,
  gid        int primary key auto_increment,#商品id
  -- img_url   varchar(64),#图片路径从good_img获得
  f_id      int,#类id如上衣,女装之类的
  name      varchar(16),#商品名
  intr      varchar(64),#商品介绍
  price     decimal(8,2),#商品价格
  designer  varchar(16),#设计师
  brand     varchar(16),#品牌
  spec1     varchar(8),#规格1名称
  spec1_msg varchar(255),#规格1具体
  spec2     varchar(8),#规格2名称
  spec2_msg varchar(255),#规格2具体
  stock     int,#库存
  mail      bool,#是否包邮
  promiss   varchar(64),#卖家担保
  shop      varchar(16),#店铺
  shopintr  varchar(125),#店铺介绍
);
-- good_family

-- 首页表格 end --





-- 用户信息表 userInfo
-- 存储购物车,喜欢,好友,粉丝
-- create table userInfo(
--   uid       int primary key,--对应user表的id
--   goodlist  varchar(255) default null,--购物车列表,商品id字符串"1,2,3..."
--   likes     varchar(255) default null,--商品id 字符串"1,123,654..."
--   friends   varchar(255) default null,--朋友/关注 id字符串"1,2,3,4,255"
--   fans      varchar(255) default null,--粉丝,谁点了关注"5,9,7,186..."
-- );
-- , "1,2", "1,2", "11,22", "11,22"
  
-- 设计师品牌 design_brand 表
drop table design_brand;
create table design_brand(
  id      int primary key auto_increment,
  did     int,#设计师id
  brand   varchar(16),
  b_img   varchar(64)   
);

insert into design_brand VALUES
(null,001,"just2you","./img/index/designbrand/designbrand1.jpg"),
(null,002,"6月1号到6月15号外出不发货","./img/index/designbrand/designbrand2.jpg"),
(null,003,"立里Lil","./img/index/designbrand/designbrand3.jpg"),
(null,004,"enson9安森玖","./img/index/designbrand/designbrand4.jpg"),
(null,005,"YELLOWQUEEN","./img/index/designbrand/designbrand5.jpg"),
(null,006,"BUTT原创设计师品牌","./img/index/designbrand/designbrand6.jpg"),
(null,007,"余位独立首饰设计","./img/index/designbrand/designbrand7.jpg"),
(null,008,"Marcm.th","./img/index/designbrand/designbrand8.jpg"),
(null,009,"三巷","./img/index/designbrand/designbrand9.jpg"),
(null,010,"向前","./img/index/designbrand/designbrand10.jpg");

-- 手工艺人 hand_jober
drop table hand_jober;
create table hand_jober(
  id      int primary key auto_increment,
  sid     int,
  name    varchar(16),
  care    int,
  h_img   varchar(64)
);

insert into hand_jober values
(null,001,"百里时光（4月1日-8日店休不发货）",4470,"./img/index/handjober/handjober1.jpg"),
(null,002,"Needlework两针一线",4413,"./img/index/handjober/handjober2.jpg"),
(null,003,"sobag独立手作",1647,"./img/index/handjober/handjober3.jpg"),
(null,004,"竞仙原创",973,"./img/index/handjober/handjober4.jpg"),
(null,005,"宝木子手工布偶坊",371,"./img/index/handjober/handjober5.jpg"),
(null,006,"浆果后院手作",4915,"./img/index/handjober/handjober6.jpg"),
(null,007,"浆果后院手作",5150,"./img/index/handjober/handjober7.jpg"),
(null,008,"独立银饰",4400,"./img/index/handjober/handjober8.jpg");

-- 好物推荐 recommend
drop table recommend;
create table recommend(
  id        int primary key auto_increment,
  gid       int,
  classic   varchar(16),
  r_img     varchar(64)
);
insert into recommend values
(null,601,"头饰","./img/index/recommend/list1/recommend1_1.jpg"),
(null,602,"胸针","./img/index/recommend/list1/recommend1_2.jpg"),
(null,603,"夜灯","./img/index/recommend/list1/recommend1_3.jpg"),
(null,604,"笔记本","./img/index/recommend/list1/recommend1_4.jpg"),
(null,605,"家居","./img/index/recommend/list1/recommend1_5.jpg"),
(null,606,"花朵","./img/index/recommend/list1/recommend1_6.jpg"),
(null,607,"苹果手机壳","./img/index/recommend/list1/recommend1_7.jpg"),
(null,608,"耳环","./img/index/recommend/list1/recommend1_8.jpg"),
(null,609,"玻璃杯","./img/index/recommend/list1/recommend1_9.jpg"),
(null,610,"小礼服","./img/index/recommend/list1/recommend1_10.jpg"),
(null,611,"盘花","./img/index/recommend/list1/recommend1_11.jpg"),
(null,612,"家居摆件","./img/index/recommend/list1/recommend1_12.jpg"),
(null,613,"摆件","./img/index/recommend/list2/recommend2_1.jpg"),
(null,614,"耳钉","./img/index/recommend/list2/recommend2_2.jpg"),
(null,615,"家居装饰","./img/index/recommend/list2/recommend2_3.jpg"),
(null,616,"花器","./img/index/recommend/list2/recommend2_4.jpg"),
(null,617,"情侣手表","./img/index/recommend/list2/recommend2_5.jpg"),
(null,618,"连衣裙","./img/index/recommend/list2/recommend2_6.jpg"),
(null,619,"礼盒","./img/index/recommend/list2/recommend2_7.jpg"),
(null,620,"手表","./img/index/recommend/list2/recommend2_8.jpg"),
(null,621,"耳钉","./img/index/recommend/list2/recommend2_9.jpg"),
(null,622,"绒花","./img/index/recommend/list2/recommend2_10.jpg"),
(null,623,"手机壳","./img/index/recommend/list2/recommend2_11.jpg"),
(null,624,"苹果手机壳","./img/index/recommend/list2/recommend2_12.jpg");
