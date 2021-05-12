# 艾尔森除醛

### 支付逻辑
微信小程序: WEAPP
应用服务器: WESER
腾讯官方:   TENCENT

1. WEAPP 调用 we.login -> code 
2. WEAPP 调用 WESER接口 jscode2session -> TENCENT接口 jscode2session -> openid
3. WEAPP 调用 WESER接口 wxpay -> TENCENT接口 unifiedorder -> prepay_id
4. WEAPP 调用 we.requestPayment(prepay_id)


### 安装说明

1. 安装 `nodejs` 和 `mysql` 服务器
2. 创建数据库用户 `clean` ,密码 `Qwert12345!@#$%`
3. 以 `utf8` 编码创建数据库 `clean`,导入 sql 文件夹的数据和程序，并且打开 `events` 开关,测试 event_5m 能正常运行
4. 将 server 目录拷贝到服务器，进入目录安装库 `npm i`
5. 敲入命令`npm i -g pm2`, 安装 `pm2` 服务器
6. 敲入命令`pm2 start app.js` 启动服务器