/**
 * Created by dell on 2017/4/14.
 */


// 从上一个网页接收传递来的id

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var store_id = GetQueryString("id");
console.log(store_id);

// 页面加载，根据传递的id 加载id所对应的信息
$(function () {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8097/store/item/ById",
        dataType:"json",
        data:{"id":store_id},
        timeout:5000,
        success:function (arr) {
            var data = arr.data;
            if(arr.status==200){  // 200
                $("#goodsPic").attr("src",arr.data.images);
                $("#price").val(toDecimal2(arr.data.money));
                $("#goodsName").val(arr.data.title);

                if(arr.data.status == 1){
                    $("#putaway").attr("checked",true);
                }else{
                    $("#downaway").attr("checked",true);
                }

            }else {

            }
        },
        error:function () {

        }
    })
});



var objUrl;
var imgBase64="";
$("#goodsPicBtn").click(function () {
    // $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    $("#goodsPicBtn").on("change",function(){

        objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $("#goodsPic").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
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



//  点击 “提交”  数据提交到后台

$("#changeSubmit").click(function () {

    // var storeid = getCookie("id");     //  获取cookie

    var goodsPic;
    if(imgBase64 ==　""){
        goodsPic =  $("#goodsPic").attr("src");
    }else{
        goodsPic =  imgBase64;
    }

    var goodsName = $("#goodsName").val();
    var price = $("#price").val();
    var status = $("input[name=status]:checked").val();
    if(goodsName!=""&&price!=""){

        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8097/store/item/update",
            dataType:"json",
            data:{
                "cropped":goodsPic,
                "title":goodsName,
                "money":price,
                "storeId":getCookie("id"),
                "status":status,
                "id":store_id
            },
            success:function (arr) {

                if(arr.status == 200){
                    notie.alert(1, '修改成功', 2);
                    // window.history.back();
                }
                else{
                    notie.alert(3, '服务器繁忙，请稍后重试', 2);
                }

            },
            error:function () {
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
        })

    }else{
        notie.alert(2, '请填写完整信息', 2);
    }
});