(function() {
    // 配置
    var envir = 'online';
    var configMap = {
        test: {
            appkey: 'cb131b18db0393b79adb05f2ee663445',
            url:'https://apptest.netease.im'
        },
        pre:{
    		appkey: 'cb131b18db0393b79adb05f2ee663445',
    		url:'http://preapp.netease.im:8184'
        },
        online: {
           appkey: 'cb131b18db0393b79adb05f2ee663445',
           url:'https://app.netease.im'
        }
    };
    window.CONFIG = configMap[envir];
}());