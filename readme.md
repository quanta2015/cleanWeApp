# 艾尔森除醛

### 支付逻辑
微信小程序: WEAPP
应用服务器: WESER
腾讯官方:   TENCENT

1. WEAPP 调用 we.login -> code 
2. WEAPP 调用 WESER接口 jscode2session -> TENCENT接口 jscode2session -> openid
3. WEAPP 调用 WESER接口 wxpay -> TENCENT接口 unifiedorder -> prepay_id
4. WEAPP 调用 we.requestPayment(prepay_id)


