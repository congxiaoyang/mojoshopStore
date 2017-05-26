/**
 * 主要业务逻辑相关
 */
// var userUID = readCookie("email");
// var token = readCookie("sdktoken");

var userUID = readCookie("id");
var token = readCookie("cilentIm");
console.log(userUID);
console.log(token);

/**
 * 实例化
 * @see module/base/js
 */

var yunXin = new YX(userUID);
