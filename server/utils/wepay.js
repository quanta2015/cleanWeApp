var xmlreader = require("xmlreader");
var crypto = require('crypto');
var xml2js = require('xml2js');

var toQueryString = (obj) => Object.keys(obj)
    .filter(key => key !== 'sign' && obj[key] !== void 0 && obj[key] !== '')
    .sort()
    .map(key => key + '=' + obj[key]).join('&');
var md5 = (str, encoding = 'utf8') => crypto.createHash('md5').update(str, encoding).digest('hex');


var wxpay = {

    parseXML:  (xml)=> new Promise((resolve, reject) => {
      const opt =  {trim: true, explicitArray: false, explicitRoot: false};
      xml2js.parseString(xml, opt, (err, res) => err ? reject(new Error('XMLDataError')) : resolve(res || {})) 
    }),

    buildXML: function (obj, rootName = 'xml') {
      const opt = {xmldec: null, rootName, allowSurrogateChars: true, cdata: true};
      return new xml2js.Builder(opt).buildObject(obj);
    },

    //把金额转为分
    getmoney: function (money) {
        return parseFloat(money) * 100;
    },

    // 随机字符串产生函数  
    createNonceStr: function () {
        return Math.random().toString(36).substr(2, 15);
    },

    // 时间戳产生函数  
    createTimeStamp: function () {
        return parseInt(new Date().getTime() / 1000) + '';
    },

    //签名加密算法
    paysignjsapi: function (appid, body, mch_id, nonce_str, notify_url, openid, out_trade_no, spbill_create_ip, total_fee, trade_type, mchkey) {
        var ret = {
            appid: appid,
            mch_id: mch_id,
            nonce_str: nonce_str,
            body: body,
            notify_url: notify_url,
            openid: openid,
            out_trade_no: out_trade_no,
            spbill_create_ip: spbill_create_ip,
            total_fee: total_fee,
            trade_type: trade_type
        }
        var string = `${raw(ret)}&key=${mchkey}`
        return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
    },
    // 小程序签名
    paysignjsapimini: function (appId, nonceStr, package, signType, timestamp, mchkey) {
        let ret = {
            appId: appId,
            nonceStr: nonceStr,
            package: package,
            signType: signType,
            timeStamp: timestamp,
        }
        console.log('Miniret:', ret);
        let string = `${raw(ret)}&key=${mchkey}`
        return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
    },
    getXMLNodeValue: function (xml) {
        xmlreader.read(xml, function (errors, response) {
            if (null !== errors) {
                console.log(errors)
                return;
            }
            console.log('长度===', response.xml.prepay_id.text().length);
            var prepay_id = response.xml.prepay_id.text();
            console.log('解析后的prepay_id==', prepay_id);
            return prepay_id;
        });
    }

}
function raw(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key] = args[key];
    });
    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
}

module.exports = wxpay;