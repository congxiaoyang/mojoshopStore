/**
 * Created by dell on 2017/4/24.
 */

// 分页 加载数据函数
function pageLoad(curr,putawayStatus) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8097/store/order/search/cleared",
        dataType:"json",
        data:{
            "storeId":getCookie("id"),
            "page":curr || 1,
            "rows":20    //显示的行数
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var status = arr.status;  // 返回状态值
            var data = arr.data.order;   //  数据
            var tbody = $("#orderSettled");  //  tbody;
            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){

                        var buyerStatus;     // 签收状态
                        if(data[i].buyer == 1){
                            buyerStatus = "已签收"
                        }else{
                            buyerStatus = "未签收"
                        }

                        var payWay;     // 签收状态
                        switch (data[i].pay){
                            case 1 : payWay = "支付宝";
                                    break;
                            case 2 : payWay = "微信"
                        }

                        var settleStatus;
                        switch (data[i].settlemen){
                            case 1 : settleStatus = "已结算";
                                break;
                            case 0 : settleStatus = "未结算"
                        }


                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td>'+ data[i].id +'</td> ' +   //订单号
                            '<td style="width: 6.666%">'+ data[i].timeStampId +'</td> ' +   //交易号
                            '<td><img src="' + data[i].images + '" alt="图片加载失败"></td> ' +  // 图片
                            '<td class="name">'+ data[i].title +'</td> ' +  // 商品名称
                            '<td>'+ data[i].counts +'</td> ' +  // 商品数量
                            '<td class="redMark">￥'+ toDecimal2(data[i].money) +'</td> ' +  // 商品价格
                            '<td>'+ data[i].userName +'</td> ' +  // 买家昵称
                            '<td>'+ data[i].userCode+'</td> ' +  // 买家账号
                            '<td>'+ data[i].message+'</td> ' +  // 留言
                            '<td>'+ buyerStatus+'</td> ' +  // 签收状态
                            '<td>'+ payWay+'</td> ' +  // 支付方式

                            '<td> <p>'+ge_time_format(data[i].createTime)+'</p></td> ' +   //下单时间
                            '<td> <p>'+ge_time_format(data[i].receivingTime)+'</p></td> ' +   //收货时间
                            '<td>'+ settleStatus+'</td> ' +  // 结算状态
                            '<td> <p>'+ge_time_format(data[i].settlemenTime)+'</p> </td> ' +   // 结算时间
                            '<td> <a href="javascript:void (0)" class="operateIcon deleteBtn"><i class="iconfont">&#xe601;</i></a></td> ' +
                            '</tr>';


                    }

                    tbody.html(str);
                }

            }else{
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
            //显示分页
            laypage({
                cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: arr.data.pages, //通过后台拿到的总页数
                curr: curr || 1, //当前页
                jump: function(obj, first){ //触发分页后的回调
                    if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                        pageLoad(obj.curr,putawayStatus);
                    }
                },
                first:false,
                last:false
            });

        },
        error:function () {
            notie.alert(3, '服务器繁忙，请稍后重试', 2);
        }
    })
}

$(function () {
    pageLoad(1,1);
});


//  点击修改去修改页面
$("#orderSettled").delegate(".changeBtn","click",function () {
    var id = $(this).parents("tr").attr("data-id");
    window.location.href="change.html?id="+id;
});


// 点击 删除
$('#orderSettled').delegate(".deleteBtn","click",function(){
    var _this = $(this);
    var id = $(this).parents("tr").attr("data-id").trim();
    console.log(id);
    $('#btn-dialogBox').dialogBox({
        hasClose: true,
        hasBtn: true,
        confirmValue: '确定',
        confirm: function(){
            // 这里写数据传递
            $.ajax({
                type:"post",
                url:"http://192.168.1.111:8097/store/order/remove",
                dataType:"json",
                data:{"id":id,"storeId":getCookie("id")},
                success:function (arr) {
                    if(arr.status == 200){
                        _this.parents("tr").remove();
                        notie.alert(1, '删除成功!', 2);
                    }else{
                        notie.alert(3, '服务器繁忙，请稍后重试', 2);
                    }

                },
                error:function () {
                    notie.alert(3, '服务器繁忙，请稍后重试', 2);
                }
            });
        },
        cancelValue: '取消',
        title: '删除',
        content: '删除之后不可恢复，确定要删除么'
    });
});

//  ===========================================================  搜索  ============================================

//  搜索函数
function searchPageLoad(curr,putawayStatus,searchCon) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8097/store/order/search/cleared",
        dataType:"json",
        data:{
            "page":curr || 1,
            "storeId":getCookie("id"),   //id
            "rows":20,    //显示的行数
            "search":searchCon    // 搜索内容
        },
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var status = arr.status;  // 返回状态值
            var data = arr.data.order;   //  数据
            var tbody = $("#orderSettled");  //  tbody;
            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){


                        var buyerStatus;     // 签收状态
                        if(data[i].buyer == 1){
                            buyerStatus = "已签收"
                        }else{
                            buyerStatus = "未签收"
                        }

                        var payWay;     // 签收状态
                        switch (data[i].pay){
                            case 1 : payWay = "支付宝";
                                break;
                            case 2 : payWay = "微信"
                        }

                        var settleStatus;
                        switch (data[i].settlemen){
                            case 1 : settleStatus = "已结算";
                                break;
                            case 0 : settleStatus = "未结算"
                        }


                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td>'+ data[i].id +'</td> ' +   //订单号
                            '<td style="width: 6.666%">'+ data[i].timeStampId +'</td> ' +   //交易号
                            '<td><img src="' + data[i].images + '" alt="图片加载失败"></td> ' +  // 图片
                            '<td class="name">'+ data[i].title +'</td> ' +  // 商品名称
                            '<td>'+ data[i].counts +'</td> ' +  // 商品数量
                            '<td class="redMark">￥'+ toDecimal2(data[i].money) +'</td> ' +  // 商品价格
                            '<td>'+ data[i].userName +'</td> ' +  // 买家昵称
                            '<td>'+ data[i].userCode+'</td> ' +  // 买家账号
                            '<td>'+ data[i].message+'</td> ' +  // 留言
                            '<td>'+ buyerStatus+'</td> ' +  // 签收状态
                            '<td>'+ payWay+'</td> ' +  // 支付方式

                            '<td> <p>'+ge_time_format(data[i].createTime)+'</p></td> ' +   //下单时间
                            '<td> <p>'+ge_time_format(data[i].receivingTime)+'</p></td> ' +   //收货时间
                            '<td>'+ payWay+'</td> ' +  // 结算状态
                            '<td> <p>'+ge_time_format(data[i].settlemenTime)+'</p> </td> ' +   // 结算时间
                            '<td> <a href="javascript:void (0)" class="operateIcon deleteBtn"><i class="iconfont">&#xe601;</i></a></td> ' +
                            '</tr>';


                    }

                    tbody.html(str);
                }

            }else{
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
            //显示分页
            laypage({
                cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: arr.data.pages, //通过后台拿到的总页数
                curr: curr || 1, //当前页
                jump: function(obj, first){ //触发分页后的回调
                    if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                        pageLoad(obj.curr,putawayStatus);
                    }
                },
                first:false,
                last:false
            });

        },
        error:function () {
            notie.alert(3, '服务器繁忙，请稍后重试', 2);
        }
    })
}

//  点击搜索  按条件搜索
$(".searchIcon a").click(function () {
    var searchCon = $("#search").val();
    searchPageLoad(1,1,searchCon);
});


$("#search").keyup(function(event){
    if(event.keyCode == 13){
        var searchCon = $("#search").val();
        searchPageLoad(1,1,searchCon);
    }
});

//  监听搜索框中的值，如果值为空，重新请求

$('#search').bind('input propertychange', function() {
    if($(this).val()==""){
        searchPageLoad(1,1,"");
    }
});