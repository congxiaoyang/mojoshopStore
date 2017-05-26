/**
 * Created by dell on 2017/4/14.
 */


//  从后台加载数据 渲染到页面

$(function () {

    var cookie = document.cookie;

    console.log(getCookie("token"));

    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8097/store/msg/search/store",
        dataType:"json",
        async:false,
        data:{"storeId":getCookie("id")},
        timeout: 5000, //超时时间：5秒
        success:function (arr) {

            if(arr.status == 200){

                $("#storeLogo").attr("src",arr.data.logo);
                $("#storeName").text(arr.data.storeName);

                var am = arr.data.serviceAm;
                var amArray = am.split(",");
                var amStart = amArray[0];
                var amEnd = amArray[1];

                var pm = arr.data.servicePm;
                var pmArray = pm.split(",");
                var pmStart = pmArray[0];
                var pmEnd = pmArray[1];

                $("#amTime").text(amStart + "-" + amEnd);
                $("#pmTime").text(pmStart + "-" + pmEnd);
                $("#storeIntro p").text(arr.data.context);
                $("#storeUrl").html(arr.data.storeUrl);
            }else{
                notie.alert(3, '服务器忙，请稍后重试', 2);
            }

        },
        error:function () {
            notie.alert(3, '服务器忙，请稍后重试', 2);
        }
    });
});


//  点击复制 复制商家链接


function copyArticle(event){
    const range = document.createRange();
    range.selectNode(document.getElementById('storeUrl'));
    const selection = window.getSelection();
    if(selection.rangeCount > 0) selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
}
document.getElementById('copy').addEventListener('click', copyArticle, false);