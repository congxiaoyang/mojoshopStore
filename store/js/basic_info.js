/**
 * Created by dell on 2017/4/17.
 */


var storeId = getCookie("storeId");

//  基本信息 页面的 JS 数据请求等操作

$(function () {
    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8097/store/msg/search/infoCenter",
        dataType:"json",
        data:{"storeId":getCookie("id")},
        timeout: 5000, //超时时间：5秒
        success:function (arr) {
            if(arr.status == 200){

                var data = arr.data;

                $("#name").text(data.userName);
                $("#email").text(data.email);
                $("#phone").text(data.tel);
                $("#reservePhone").text(data.reserveNo);
                $("#idCard").text(data.card);
                $("#passport").text(data.passPortNo);
                $("#addr").text(data.address);
                $("#succ").text(data.creditNoCode);
                // 商品分类

                var goodsType;

                switch(data.type){
                    case 1: goodsType = "机票";
                    break;
                    case 2: goodsType = "签证";
                        break;
                    case 3: goodsType = "留学";
                        break;
                    case 4: goodsType = "家政";
                        break;
                    case 5: goodsType = "宠物";
                        break;
                    case 6: goodsType = "旅行社";
                        break;
                    case 7: goodsType = "酒店";
                        break;
                    case 8: goodsType = "搬家";
                        break;
                    case 9: goodsType = "律师";
                        break;
                    case 10: goodsType = "租车";
                        break;
                    case 11: goodsType = "书籍";
                        break;
                    case 12: goodsType = "食品";
                        break;
                    case 13: goodsType = "服装";
                        break;
                    case 14: goodsType = "保健用品";
                        break;
                    case 15: goodsType = "时尚用品";
                        break;
                    case 16: goodsType = "化妆品";
                        break;
                    case 17: goodsType = "代购";
                    break;
                    case 18: goodsType = "保险";
                        break;
                }
                $("#goodsCategory").text(data.cateName);

                //  商品销售地区
                var saleArea = data.citys.join(",");
                $("#saleArea").text(saleArea);


            }else{
                notie.alert(3, '服务器忙，请稍后重试', 2);
            }
        },
        error:function () {
            notie.alert(3, '服务器忙，请稍后重试', 2);
        }
    });
});


