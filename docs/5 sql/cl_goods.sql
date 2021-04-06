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

 Date: 06/04/2021 14:16:52
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

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

SET FOREIGN_KEY_CHECKS = 1;
