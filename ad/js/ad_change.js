/**
 * Created by dell on 2017/4/24.
 */

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var store_id = GetQueryString("id");
console.log(store_id);

$(function () {
    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8097/store/advert/ById",
        dataType:"json",
        data:{"id":store_id},
        success:function (arr) {

            if(arr.status == 200){
                $("#adBannerChangePic").attr("src",arr.data.images)
            }

            if(arr.data.status == 1){
                $("#putaway").attr("checked",true);
            }else{
                $("#downaway").attr("checked",true);
            }

        },
        error:function () {

        }
    })
});


//  点击图片，渲染在页面 并 转成 base64

var objUrl;
var imgBase64 ="";
$("#adBannerChangeBtn").click(function () {
    // $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    $("#adBannerChangeBtn").on("change",function(){

        objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $("#adBannerChangePic").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
        }else{
            alert("请选择小于2M的图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            imgBase64 = this.result; //就是base64
            console.log(this.result);
        }

    });
});


$("#changeSubmit").click(function () {
    var status = $("input[name=status]:checked").val();
    // var storeid = getCookie("storeId");     //  获取cookie
    var img;  // 最终传入数据库的图片
    console.log(imgBase64);
    if(imgBase64 == ""){
        img = $("#adBannerChangePic").attr("src");
        // img = base64encode(img);
    }else{
        img = imgBase64;
    }

    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8097/store/advert/update",
        dataType:"json",
        data:{"cropped":img,"status":status,"storeId":getCookie("id"),"id":store_id},
        success:function (arr) {

            if(arr.status == 200){
                notie.alert(1, '修改成功!', 2);
                window.history.back();
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
