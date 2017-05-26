/**
 * Created by dell on 2017/4/24.
 */


// 分页 加载数据函数

function pageLoad(curr,putawayStatus) {
    console.log(getCookie("id"));
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8097/store/advert/search",
        dataType:"json",
        data:{
            "page":curr || 1,
            "storeId":getCookie("id"),   //id
            "rows":20,    //显示的行数
            "status":putawayStatus    //上下架的状态
        },
        async:false,
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            $(".tableHint_netError").addClass("hidden");
            var status = arr.status;  // 返回状态值
            var data = arr.data.mjStoreAds;   //  数据
            var tbody = $("#ad_search");  //  tbody;
            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){
                        var dataStatus;     //上架状态 或者 是下架状态
                        if(data[i].status == 1){
                            dataStatus = "上架";
                        }else{
                            dataStatus = "下架"
                        }


                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td class="ad_banner"><img src="' + data[i].images + '" alt="图片加载失败"></td> ' +
                            '<td> <p>'+ge_time_format(data[i].createTime)+'</p></td> ' +
                            '<td> <p>'+ge_time_format(data[i].updateTime)+'</p> </td> ' +
                            '<td class="status">'+dataStatus+'</td> ' +
                            '<td class="operateIcon">' +
                            ' <a href="javascript:void (0)" class="deleteBtn"><i class="iconfont">&#xe601;</i></a> ' +
                            '<a href="#" class="changeBtn"><i class="iconfont">&#xe630;</i></a>' +
                            ' </td>'+
                            '</tr>';

                        if(dataStatus == "上架"){
                            $("td.status").addClass("true");
                        }

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
$("#ad_search").delegate(".changeBtn","click",function () {
    var id = $(this).parents("tr").attr("data-id");
    window.location.href="ad_change.html?id="+id;
});

// 点击 删除
$('#ad_search').delegate(".deleteBtn","click",function(){
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
                url:"http://192.168.1.111:8097/store/advert/remove",
                dataType:"json",
                data:{"id":id},
                jsonp: "callbackparam",
                jsonpCallback: "jsonpCallback1",
                success:function (arr) {
                    if(arr.status)
                    _this.parents("tr").remove();
                },
                error:function () {

                }
            });
        },
        cancelValue: '取消',
        title: '删除',
        content: '删除之后不可恢复，确定要删除么'
    });
});

//  点击 "状态" 下拉框，选择上架和下架 渲染在页面上

$(".status_search").click(function () {

    var status = $(this).attr("data-value");

    pageLoad(1,status)

});

