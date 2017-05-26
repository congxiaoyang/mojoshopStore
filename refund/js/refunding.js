/**
 * Created by dell on 2017/5/7.
 */


/**
 * Created by dell on 2017/4/24.
 */

// 分页 加载数据函数
function pageLoad(curr,putawayStatus) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8097/store/order/refund_in",
        dataType:"json",
        async:false,
        data:{
            "storeId":getCookie("id"),
            "page":curr || 1,
            "rows":20    //显示的行数
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var status = arr.status;  // 返回状态值
            var data = arr.data.refund;   //  数据
            var tbody = $("#searchList");  //  tbody;
            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){

                        var refundReason;     // 退款原因
                        switch (data[i].choose){
                            case 1 : refundReason = "不想要了";
                                break;
                            case 2 : refundReason = "未按照约定时间完成";
                                break;
                            case 3 : refundReason = "态度不好";
                                break;
                            case 4 : refundReason = "与所说服务不符";
                                break;
                        }


                        var accountType;     // 退款原因
                        switch (data[i].selection){
                            case 1 : accountType = "支付宝";
                                break;
                            case 2 : accountType = "微信";
                                break;
                        }


                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td>'+ data[i].id +'</td> ' +   //编号
                            '<td>'+ refundReason +'</td> ' +   //退款原因
                            '<td class="name" title="'+ data[i].cause +'">'+ data[i].cause +'</td> ' +   //退款说明
                            '<td>'+ accountType +'</td> ' +   //账户类型
                            '<td>'+ data[i].account +'</td> ' +   //账户
                            '<td>'+ data[i].name +'</td> ' +   //姓名
                            '<td>'+ data[i].cid +'</td> ' +   //商户ID
                            '<td><img src="' + data[i].images + '" alt="图片加载失败"></td> ' +  // 图片
                            '<td class="name">'+ data[i].title +'</td> ' +  // 商品名称
                            '<td class="redMark">￥'+ toDecimal2(data[i].money) +'</td> ' +  // 价格

                            '<td> <p>'+ge_time_format(data[i].createTime)+'</p></td> ' +   //创建时间

                            '<td> <input type="button" value="同意" class="agree"> <input type="button" value="不同意" class="disagree"> </td> ' +
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


// 点击 同意
$('#searchList').delegate(".agree","click",function(){
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
                url:"http://192.168.1.111:8097/store/order/update_refunded",
                dataType:"json",
                data:{"id":id,"storeId":getCookie("id")},
                timeout:5000,
                success:function (arr) {
                    if(arr.status == 200){
                        _this.parents("tr").remove();
                        notie.alert(1, '同意成功!', 2);
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
        title: '同意',
        content: '确定要同意么'
    });
});

// 点击 不同意
$('#searchList').delegate(".disagree","click",function(){
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
                url:"http://192.168.1.111:8097/store/order/update_no_refund",
                dataType:"json",
                data:{"id":id,"storeId":getCookie("id")},
                timeout:5000,
                success:function (arr) {
                    if(arr.status == 200){
                        _this.parents("tr").remove();
                        notie.alert(1, '拒绝成功', 2);
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
        title: '确定',
        content: '确定要拒绝此订单么'
    });
});

