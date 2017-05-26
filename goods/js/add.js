/**
 * Created by dell on 2017/4/14.
 */


var objUrl;
var imgBase64="";
$("#goodsPicBtn").click(function () {
    // $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    $("#goodsPicBtn").on("change",function(){

        objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $("#addGoodsPic").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
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

$("#addSubmit").click(function () {

    // var storeid = getCookie("id");     //  获取cookie

    var goodsName = $("#goodsName").val();
    var price = $("#price").val();
    if(goodsName!=""&&price!=""&&imgBase64!=""){

        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8097/store/item/add",
            dataType:"json",
            data:{"cropped":imgBase64,"title":goodsName,"money":price,"storeId":getCookie("id")},
            success:function (arr) {

                if(arr.status == 200){
                    notie.alert(1, '上传成功!', 2);
                    // $("#addSubmit").popover('hide');
                }
                else{
                    notie.alert(3, '请求失败', 2);
                }

            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                notie.alert(3, '服务器忙，请稍后重试', 2);
            }
        })

    }else{
        notie.alert(3, '请填写完整的信息', 2);
    }
});