export default {
  pages: [
    'pages/order/index',
    'pages/intro/index',
    'pages/case/index',
    'pages/shop/index',
    'pages/user/index',   
    'pages/order_g/index',
    'pages/order_m/index',
    'pages/order_e/index',
  ],
  tabBar: {
    list: [{
      'iconPath': 'assets/icon_cont.png',
      'selectedIconPath': 'assets/icon_cont_c.png',
      pagePath: 'pages/intro/index',
      text: '简介'
    }, {
      'iconPath': 'assets/icon_data.png',
      'selectedIconPath': 'assets/icon_data_c.png',
      pagePath: 'pages/case/index',
      text: '案例'
    }, {
      'iconPath': 'assets/icon_mooc.png',
      'selectedIconPath': 'assets/icon_mooc_c.png',
      pagePath: 'pages/order/index',
      text: '预约'
    }, {
      'iconPath': 'assets/icon_mooc.png',
      'selectedIconPath': 'assets/icon_mooc_c.png',
      pagePath: 'pages/shop/index',
      text: '商店'
    }, {
      'iconPath': 'assets/icon_mooc.png',
      'selectedIconPath': 'assets/icon_mooc_c.png',
      pagePath: 'pages/user/index',
      text: '个人'
    }],
    'color': '#000',
    'selectedColor': '#3366cc',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
