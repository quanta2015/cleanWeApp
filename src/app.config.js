export default {
  pages: [

    
    'pages/order/index',
    'pages/case/index',
    'pages/intro/index',
    'pages/order_g/index',
    'pages/order_e/index',
    'pages/order_g_n1/index',
    'pages/order_g_n2/index',
    'pages/info_ret/index',
    
    'pages/shop/index',
    'pages/shop_sp/index',
    'pages/shop_cart/index',
    'pages/shop_buy/index',
       
    'pages/user/index',
    'pages/launch/index', 
    'pages/his_order/index',
    'pages/his_shopping/index',
    
  ],
  tabBar: {
    list: [{
      'iconPath': 'static/ico_intr.png',
      'selectedIconPath': 'static/ico_intr_c.png',
      pagePath: 'pages/intro/index',
      text: '简介'
    }, {
      'iconPath': 'static/ico_exam.png',
      'selectedIconPath': 'static/ico_exam_c.png',
      pagePath: 'pages/case/index',
      text: '案例'
    }, {
      'iconPath': 'static/ico_orde.png',
      'selectedIconPath': 'static/ico_orde_c.png',
      pagePath: 'pages/order/index',
      text: '预约'
    }, {
      'iconPath': 'static/ico_shop.png',
      'selectedIconPath': 'static/ico_shop_c.png',
      pagePath: 'pages/shop/index',
      text: '商店'
    }, {
      'iconPath': 'static/ico_user.png',
      'selectedIconPath': 'static/ico_user_c.png',
      pagePath: 'pages/user/index',
      text: '个人'
    }],
    'color': '#aaa',
    'selectedColor': '#109dcd',
    'backgroundColor': '#fafafa',
    'borderStyle': 'white'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#333',
    navigationBarTitleText: '艾尔森除醛',
    navigationBarTextStyle: 'white'
  }
}
