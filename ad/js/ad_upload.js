/**
 * Created by dell on 2017/4/24.
 */

var objUrl;
var imgBase64;
$("#adBannerUploadBtn").click(function () {
    // $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    $("#adBannerUploadBtn").on("change",function(){

        objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $("#adBannerUploadPic").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
        }else{
            alert("请选择小于2M的图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            imgBase64 = this.result; //就是base64
        }

    });
});

$("#uploadSubmit").click(function () {
    var status = $("input[name=status]:checked").val();
    // var storeid = getCookie("storeId");     //  获取cookie
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8097/store/advert/add",
        dataType:"json",
        data:{"cropped":imgBase64,"status":status,"storeId":getCookie("id")},
        timeout:5000,
        success:function (arr) {

            if(arr.status == 200){
                notie.alert(1, '上传成功!', 2);
            }
            else{
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }

        },
        error:function () {
            notie.alert(3, '服务器繁忙，请稍后重试', 2);
        }
    })
});
