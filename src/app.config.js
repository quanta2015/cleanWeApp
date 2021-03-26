export default {
  pages: [
    'pages/intro/index',
    'pages/order/index',
    'pages/order_g/index',
    'pages/order_g_n2/index',
    'pages/order_g_n1/index',
    
    
    'pages/order_e/index',
    'pages/order_m/index',
    // 'pages/intro/index',
    'pages/case/index',
    'pages/shop/index',
    'pages/shop_sp/index',
    'pages/shop_cart/index',
    'pages/shop_buy/index',
    'pages/user/index',   
    'pages/info_ret/index',
    
  ],
  tabBar: {
    list: [{
      'iconPath': 'assets/icon_intr.png',
      'selectedIconPath': 'assets/icon_intr_c.png',
      pagePath: 'pages/intro/index',
      text: '简介'
    }, {
      'iconPath': 'assets/icon_exam.png',
      'selectedIconPath': 'assets/icon_exam_c.png',
      pagePath: 'pages/case/index',
      text: '案例'
    }, {
      'iconPath': 'assets/icon_orde.png',
      'selectedIconPath': 'assets/icon_orde_c.png',
      pagePath: 'pages/order/index',
      text: '预约'
    }, {
      'iconPath': 'assets/icon_shop.png',
      'selectedIconPath': 'assets/icon_shop_c.png',
      pagePath: 'pages/shop/index',
      text: '商店'
    }, {
      'iconPath': 'assets/icon_user.png',
      'selectedIconPath': 'assets/icon_user_c.png',
      pagePath: 'pages/user/index',
      text: '个人'
    }],
    'color': '#aaa',
    'selectedColor': '#2EAE76',
    'backgroundColor': '#eee',
    'borderStyle': 'white'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#333',
    navigationBarTitleText: '艾尔森除醛',
    navigationBarTextStyle: 'white'
  }
}
