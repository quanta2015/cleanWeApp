import React from 'react'

import data    from 'icon/icon_data.svg';
import data_c  from 'icon/icon_data_c.svg';
import mooc    from 'icon/icon_mooc.svg';
import mooc_c  from 'icon/icon_mooc_c.svg';
import shop    from 'icon/icon_shop.svg';
import shop_c  from 'icon/icon_shop_c.svg';
import cont    from 'icon/icon_cont.svg';
import cont_c  from 'icon/icon_cont_c.svg';



export const DATE_FORMAT  = 'YYYY/MM/DD'
export const MONTH_FORMAT = 'YYYY/MM'


export var MENU_MAIN = 
   [
    { title:'服务案例', icon: shop, iconc: shop_c, path: '/', role: 1},
    { title:'服务参数', icon: mooc, iconc: mooc_c, path: '/home', role: 1},
    { title:'产品资料', icon: data, iconc: data_c, path: '/good', role: 1},
    { title:'系统设置', icon: cont, iconc: cont_c, path: '/conf', role: 2}]

export var MENU_SYS = [
    { etl:'Mooc Schedule'   , ctl:'批改实验' },
    { etl:'Card Result'     , ctl:'打卡监控' },
    { etl:'Answer Result'   , ctl:'答题统计' },
    { etl:'Question DB'     , ctl:'题库管理' },
    { etl:'Imp Students'    , ctl:'导入学生' },
    { etl:'Mooc Schedule'   , ctl:'管理慕课' },
    { etl:'Define Term'     , ctl:'学期起止' },
    { etl:'Add abnormal'    , ctl:'统计分析' },
    { etl:'Project Judge'   , ctl:'项目答辩' },
    { etl:'Mark Result'     , ctl:'成绩管理' },
    ]


