/**
 * Created by dell on 2017/4/17.
 */


var objUrl;
var imgBase64="";
$("#file").click(function () {
    // $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    $("#file").on("change",function(){

        objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $("#storeLogo").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
        }else{
            alert("请选择小于2M的图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            imgBase64 = this.result; //就是base64
            // console.log(this.result);
        }

    });
});


//  从后台加载数据 渲染到页面

$(function () {

    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8097/store/msg/search/store",
        dataType:"json",
        data:{"storeId":getCookie("id")},
        timeout: 5000, //超时时间：5秒
        success:function (arr) {


            if(arr.status == 200){

                $("#storeLogo").attr("src",arr.data.logo);
                $("#storeName").val(arr.data.storeName);

                var am = arr.data.serviceAm.split(",");
                $("#am_startTime").val(am[0]);
                $("#am_endTime").val(am[1]);

                var pm = arr.data.servicePm.split(",");
                $("#pm_startTime").val(pm[0]);
                $("#pm_endTime").val(pm[1]);

                $("#storeIntro").val(arr.data.context);

            }else{
                notie.alert(3, '服务器忙，请稍后重试', 2);
            }

        },
        error:function () {
            notie.alert(3, '服务器忙，请稍后重试', 2);
        }
    });
});

//  点击完成

$("#submit").click(function () {
    var storeName = $("#storeName").val();
    var amTime = $("#am_startTime").val()+","+$("#am_endTime").val();
    var pmTime = $("#pm_startTime").val()+","+$("#pm_endTime").val();
    var storeIntro = $("#storeIntro").val();
    var img;
    if(imgBase64 == ""){
        img = $("#storeLogo").attr("src");
    }else{
        img = imgBase64;
    }

    if(storeName!=""&&$("#am_startTime").val()!=""&&$("#pm_startTime").val()!=""&&$("#am_endTime").val()!=""&&$("#pm_endTime").val()!=""&&storeIntro!=""){
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8097/store/msg/update/store",
            dataType:"json",
            data:{
                "storeId":getCookie("id"),
                "storeName":storeName,
                "serviceAm":amTime,
                "servicePm":pmTime,
                "context":storeIntro,
                "file":img
            },
            timeout:5000,
            success:function (arr) {
                if(arr.status == 200){
                    notie.alert(1, '修改成功!', 2);
                    // window.history.back();
                }else{
                    notie.alert(3, '服务器忙，请稍后重试', 2);
                }
            },
            error:function () {
                notie.alert(3, '服务器忙，请稍后重试', 2);
            }
        });
    }else{
        notie.alert(2, '请填写完整信息', 2);
    }

});



