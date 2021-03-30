# 艾尔森除醛

### 支付逻辑
微信小程序: WEAPP
应用服务器: WESER
腾讯官方:   TENCENT

1. WEAPP 调用 we.login -> code 
2. WEAPP 调用 WESER接口 jscode2session -> TENCENT接口 jscode2session -> openid
3. WEAPP 调用 WESER接口 wxpay -> TENCENT接口 unifiedorder -> prepay_id
4. WEAPP 调用 we.requestPayment(prepay_id)


### 小程序帐号
AppID     wxf121d862d28158fd
AppSecret 033cc0d69e2882f2d0161905b6f2fcd3

### 商户帐号
商户帐号：1487384612@1487384612
商户密码：833005
商户API： 918B724d5C54623386377cF5C7401Cfc
APPID：  wx93283a7b63362118
APPSecret： 28d926c1a251e228e5b1e6243330b982

商户操作码：201607

### 邮箱
zjairsen2020@163.com
qwert12345
