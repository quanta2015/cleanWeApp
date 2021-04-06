/*
 Navicat Premium Data Transfer

 Source Server         : 阿里云杭州aaa
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : 47.114.39.70:3306
 Source Schema         : clean

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : 65001

 Date: 30/03/2021 18:09:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cl_goods
-- ----------------------------
DROP TABLE IF EXISTS `cl_goods`;
CREATE TABLE `cl_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `spec` varchar(100) DEFAULT NULL,
  `price` varchar(10) DEFAULT NULL,
  `img_h1` varchar(100) DEFAULT NULL,
  `img_h2` varchar(100) DEFAULT NULL,
  `img_bd` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cl_goods
-- ----------------------------
BEGIN;
INSERT INTO `cl_goods` VALUES (1, '甲醛净', '瓶', '500ml', '168', '/cdn/goods/01_h1.png', '/cdn/goods/01_h2.png', '/cdn/goods/01_bd.png');
INSERT INTO `cl_goods` VALUES (2, '除味剂', '瓶', '500ml', '158', '/cdn/goods/02_h1.png', '/cdn/goods/02_h2.png', '/cdn/goods/02_bd.png');
INSERT INTO `cl_goods` VALUES (3, '净味魔盒', '个', '200g', '89', '/cdn/goods/03_h1.png', '/cdn/goods/03_h2.png', '/cdn/goods/03_bd.png');
INSERT INTO `cl_goods` VALUES (4, 'mini净味宝', '个', '100g', '32', '/cdn/goods/04_h1.png', '/cdn/goods/04_h2.png', '/cdn/goods/04_bd.png');
INSERT INTO `cl_goods` VALUES (5, '除醛净味魔球', '箱', '100g*20包', '128', '/cdn/goods/05_h1.png', '/cdn/goods/05_h2.png', '/cdn/goods/05_bd.png');
INSERT INTO `cl_goods` VALUES (6, '居家纳米矿晶', '箱', '80g*25', '36', '/cdn/goods/06_h1.png', '/cdn/goods/06_h2.png', '/cdn/goods/06_bd.png');
INSERT INTO `cl_goods` VALUES (7, '速效净化盒', '个', '150g', '32', '/cdn/goods/07_h1.png', '/cdn/goods/07_h2.png', '/cdn/goods/07_bd.png');
INSERT INTO `cl_goods` VALUES (8, '宠物除味剂', '瓶', '500ml', '29', '/cdn/goods/08_h1.png', '/cdn/goods/08_h2.png', '/cdn/goods/08_bd.png');
COMMIT;

-- ----------------------------
-- Table structure for cl_goods_sp
-- ----------------------------
DROP TABLE IF EXISTS `cl_goods_sp`;
CREATE TABLE `cl_goods_sp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) DEFAULT NULL,
  `sumPrice` varchar(20) DEFAULT NULL,
  `buyList` varchar(200) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `addr` varchar(200) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cl_goods_sp
-- ----------------------------
BEGIN;
INSERT INTO `cl_goods_sp` VALUES (26, 'olq4w5D5-hGbAEs341o3jedsPnyw', '1632', '2*6|4*2|8*1', '张三', '13874764372', '杭州市文二路杭州师范大学勤元12幢209', '2021-03-27 01:48:49');
INSERT INTO `cl_goods_sp` VALUES (27, 'olq4w5D5-hGbAEs341o3jedsPnyw', '1632', '2*6|4*2|8*1', '张三', '13874764372', '杭州市文二路杭州师范大学勤元12幢209', '2021-03-27 01:49:08');
INSERT INTO `cl_goods_sp` VALUES (39, 'olq4w5D5-hGbAEs341o3jedsPnyw', '352', '4*3|5*2', '张三', '13874764372', '杭州市文二路杭州师范大学勤元12幢209', '2021-03-29 07:54:50');
INSERT INTO `cl_goods_sp` VALUES (43, 'olq4w5KALFQGJ-EYIuhcvQkT5yj0', '723', '1*3|2*1|8*1|7*1', '张三', '17888882222', '杭州市文二路杭州师范大学勤元12幢209', '2021-03-29 09:58:22');
COMMIT;

-- ----------------------------
-- Table structure for cl_order
-- ----------------------------
DROP TABLE IF EXISTS `cl_order`;
CREATE TABLE `cl_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) DEFAULT NULL,
  `oid` varchar(20) DEFAULT NULL,
  `money` varchar(20) DEFAULT NULL,
  `tp` varchar(10) DEFAULT NULL,
  `area` varchar(10) DEFAULT NULL,
  `poi` varchar(4) DEFAULT NULL,
  `seltech` int(11) DEFAULT NULL,
  `selsafe` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cl_order
-- ----------------------------
BEGIN;
INSERT INTO `cl_order` VALUES (9, 'olq4w5D5-hGbAEs341o3jedsPnyw', '20210325010528884', '0.02', 'm', '42', '25', 1, 1);
INSERT INTO `cl_order` VALUES (10, 'olq4w5D5-hGbAEs341o3jedsPnyw', '20210325010817152', '0.00', 's', '111', '5', NULL, NULL);
INSERT INTO `cl_order` VALUES (11, 'olq4w5D5-hGbAEs341o3jedsPnyw', '20210325011357161', '0.02', 'g', '120', '5', 0, 0);
INSERT INTO `cl_order` VALUES (12, 'olq4w5D5-hGbAEs341o3jedsPnyw', '20210326033559368', '0.01', 'c', '89', '8', NULL, NULL);
INSERT INTO `cl_order` VALUES (13, 'olq4w5D5-hGbAEs341o3jedsPnyw', '20210326042425875', '0.02', 'm', '54', '12', 1, 1);
INSERT INTO `cl_order` VALUES (14, 'olq4w5D5-hGbAEs341o3jedsPnyw', '20210326043349307', '0.01', 'c', '5', '0', 0, 0);
INSERT INTO `cl_order` VALUES (15, 'olq4w5D5-hGbAEs341o3jedsPnyw', '20210326043508398', '0.03', 'g', '107', '5', 1, 1);
INSERT INTO `cl_order` VALUES (16, 'olq4w5D5-hGbAEs341o3jedsPnyw', '20210326043617082', '0.02', 'm', '23', '8', 0, 0);
INSERT INTO `cl_order` VALUES (17, 'olq4w5D5-hGbAEs341o3jedsPnyw', '20210326072219980', '0.02', 'g', '90', '5', 0, 1);
INSERT INTO `cl_order` VALUES (18, 'olq4w5N7eU_d0s8jc3VPqub7Lu0M', '20210329113505532', '0.06', 'g', '88', '23', 0, 0);
INSERT INTO `cl_order` VALUES (19, 'olq4w5D5-hGbAEs341o3jedsPnyw', '20210330055203873', '0.02', 'm', '58', '7', 0, 1);
COMMIT;

-- ----------------------------
-- Procedure structure for DEBUG_MSG
-- ----------------------------
DROP PROCEDURE IF EXISTS `DEBUG_MSG`;
delimiter ;;
CREATE PROCEDURE `clean`.`DEBUG_MSG`(msg VARCHAR(21812))
BEGIN
    select concat("** ", msg) AS '** DEBUG:';
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_CL_LIST_GOODS
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_CL_LIST_GOODS`;
delimiter ;;
CREATE PROCEDURE `clean`.`PROC_CL_LIST_GOODS`(IN `data` varchar(20000))
BEGIN

		select * from `cl_goods` order by id ;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_CL_LIST_ORDER
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_CL_LIST_ORDER`;
delimiter ;;
CREATE PROCEDURE `clean`.`PROC_CL_LIST_ORDER`(IN `data` varchar(20000))
BEGIN
		DECLARE _uid   varchar(50) DEFAULT NULL;
		SET _uid   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.uid'));
		
		select * from `cl_order` where uid = _uid;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_CL_LIST_SP_GOODS
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_CL_LIST_SP_GOODS`;
delimiter ;;
CREATE PROCEDURE `clean`.`PROC_CL_LIST_SP_GOODS`(IN `data` varchar(20000))
BEGIN
		DECLARE _uid   varchar(50) DEFAULT NULL;
		SET _uid   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.uid'));
		
		select * from `cl_goods_sp` where uid = _uid;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_CL_SAVE_ORDER
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_CL_SAVE_ORDER`;
delimiter ;;
CREATE PROCEDURE `clean`.`PROC_CL_SAVE_ORDER`(IN `data` varchar(20000))
BEGIN
	DECLARE _uid   varchar(50) DEFAULT NULL;
	DECLARE _oid   varchar(20) DEFAULT NULL;
	DECLARE _money varchar(20) DEFAULT NULL;
	DECLARE _tp    varchar(10) DEFAULT NULL;
	DECLARE _area  varchar(10) DEFAULT NULL;
	DECLARE _poi   varchar(4) DEFAULT NULL;
	DECLARE _selTech int DEFAULT NULL;
	DECLARE _selSafe int DEFAULT NULL;
	
	SET _uid   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.uid'));
	SET _oid   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.orderid'));
	SET _money = JSON_UNQUOTE(JSON_EXTRACT(data,'$.money'));
	SET _tp    = JSON_UNQUOTE(JSON_EXTRACT(data,'$.type'));
	SET _area  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.area'));
	SET _poi   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.poi'));
	SET _selTech = CONVERT(JSON_EXTRACT(data, '$.selTech'), UNSIGNED);
	SET _selSafe = CONVERT(JSON_EXTRACT(data, '$.selSafe'), UNSIGNED);
	
	insert into `cl_order`(uid,oid,money,tp,area,poi,seltech,selSafe) 
				 value(_uid,_oid,_money,_tp,_area,_poi,_selTech,_selSafe);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_CL_SAVE_SP_GOODS
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_CL_SAVE_SP_GOODS`;
delimiter ;;
CREATE PROCEDURE `clean`.`PROC_CL_SAVE_SP_GOODS`(IN `data` varchar(20000))
BEGIN
	DECLARE _id       int default null;
	DECLARE _uid   varchar(50) DEFAULT NULL;
	DECLARE _sumPrice varchar(20) DEFAULT NULL;
	DECLARE _buyList  varchar(200) DEFAULT NULL;
	DECLARE _name     varchar(20) DEFAULT NULL;
	DECLARE _phone    varchar(20) DEFAULT NULL;
	DECLARE _addr     varchar(200) DEFAULT NULL;
	DECLARE _date     varchar(20) DEFAULT NULL;
	
	SET _uid      = JSON_UNQUOTE(JSON_EXTRACT(data,'$.uid'));
	SET _sumPrice = JSON_UNQUOTE(JSON_EXTRACT(data,'$.sumPrice'));
	SET _buyList  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.buyList'));
	SET _name     = JSON_UNQUOTE(JSON_EXTRACT(data,'$.name'));
	SET _phone    = JSON_UNQUOTE(JSON_EXTRACT(data,'$.phone'));
	SET _addr     = JSON_UNQUOTE(JSON_EXTRACT(data,'$.addr'));
	SET _date     = JSON_UNQUOTE(JSON_EXTRACT(data,'$.date'));
	
	insert into cl_goods_sp(`uid`,`sumPrice`,`buyList`,`name`,`phone`,`addr`,`date`)
				 value(_uid,_sumPrice,_buyList,_name,_phone,_addr,_date);
  set _id = LAST_INSERT_ID();
	select * from cl_goods_sp where id = _id;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
