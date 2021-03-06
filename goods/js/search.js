/**
 * Created by dell on 2017/4/24.
 */

// 分页 加载数据函数
function pageLoad(curr,putawayStatus) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8097/store/item/search",
        dataType:"json",
        data:{
            "page":curr || 1,
            "storeId":getCookie("id"),   //id
            "rows":20,    //显示的行数
            "status":putawayStatus    //上下架的状态
        },
        timeout:5000,
        async:false,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var tbody = $("#goodsSearch_tbody");  //  tbody;
            var pages;  //总页数

            if(arr.data == null){
                notie.alert(2, '暂无数据', 2);
                tbody.html("");
                pages = 1;
            }else{
                var status = arr.status;  // 返回状态值
                var data = arr.data.mjCommoditys;   //  数据
                var str;
                pages = arr.data.page;
                tbody.html("");
                if(status == 200){

                    for(var i in data){
                        var dataStatus;     //上架状态 或者 是下架状态
                        if(data[i].status == 1){
                            dataStatus = "上架"
                        }else{
                            dataStatus = "下架"
                        }

                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td>'+ data[i].id +'</td> ' +   //编号
                            '<td class="ad_banner"><img src="' + data[i].images + '" alt="图片加载失败"></td> ' +  // 图片
                            '<td class="name" title="'+data[i].title+'">'+ data[i].title +'</td> ' +  // 商品名称
                            '<td class="redMark">￥'+ toDecimal2(data[i].money) +'</td> ' +  // 商品价格
                            '<td>'+ dataStatus +'</td> ' +  // 状态
                            '<td> <p>'+ge_time_format(data[i].createTime)+'</p></td> ' +   //创建时间
                            '<td> <p>'+ge_time_format(data[i].updateTime)+'</p> </td> ' +   // 更新时间
                            '<td class="operateIcon">' +
                            ' <a href="javascript:void (0)" class="deleteBtn"><i class="iconfont">&#xe601;</i></a> ' +
                            '<a href="#" class="changeBtn"><i class="iconfont">&#xe630;</i></a>' +
                            ' </td>'+
                            '</tr>'
                    }

                    tbody.html(str);
                }
                else if(status == 410){
                    notie.alert(2, '暂无数据', 2);
                    tbody.html();
                }
            }


            //显示分页
            laypage({
                cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: pages, //通过后台拿到的总页数
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
            notie.alert(3, '服务器忙，请稍后重试', 2);
        }
    })
}

$(function () {
    pageLoad(1,1);
});


//  点击修改去修改页面
$("#goodsSearch_tbody").delegate(".changeBtn","click",function () {
    var id = $(this).parents("tr").attr("data-id");
    window.location.href="change.html?id="+id;
});


// 点击 删除
$('#goodsSearch_tbody').delegate(".deleteBtn","click",function(){
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
                url:"http://192.168.1.111:8097/store/item/remove",
                dataType:"json",
                data:{"id":id},
                async:false,
                success:function (arr) {
                    if(arr.status==200){
                        notie.alert(1, '删除成功', 2);
                        _this.parents("tr").remove();
                    }else{
                        notie.alert(3, '服务器忙，请稍后重试', 2);
                    }
                },
                error:function () {
                    notie.alert(3, '服务器忙，请稍后重试', 2);
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


//  ===========================================================  搜索  ============================================

//  搜索函数
function searchPageLoad(curr,putawayStatus,searchCon) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8097/store/item/search",
        dataType:"json",
        data:{
            "page":curr || 1,
            "storeId":getCookie("id"),   //id
            "rows":20,    //显示的行数
            "status":putawayStatus,    //上下架的状态
            "search":searchCon    // 搜索内容
        },
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var tbody = $("#goodsSearch_tbody");  //  tbody;
            var pages;  //总页数

            if(arr.data == null){
                notie.alert(2, '暂无数据', 2);
                tbody.html("");
                pages = 1;
            }else{
                var status = arr.status;  // 返回状态值
                var data = arr.data.mjCommoditys;   //  数据
                var str;
                pages = arr.data.page;
                tbody.html("");
                if(status == 200){

                    for(var i in data){
                        var dataStatus;     //上架状态 或者 是下架状态
                        if(data[i].status == 1){
                            dataStatus = "上架"
                        }else{
                            dataStatus = "下架"
                        }

                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td>'+ data[i].id +'</td> ' +   //编号
                            '<td class="ad_banner"><img src="' + data[i].images + '" alt="图片加载失败"></td> ' +  // 图片
                            '<td class="name" title="'+data[i].title+'">'+ data[i].title +'</td> ' +  // 商品名称
                            '<td class="redMark">￥'+ toDecimal2(data[i].money) +'</td> ' +  // 商品价格
                            '<td>'+ dataStatus +'</td> ' +  // 状态
                            '<td> <p>'+ge_time_format(data[i].createTime)+'</p></td> ' +   //创建时间
                            '<td> <p>'+ge_time_format(data[i].updateTime)+'</p> </td> ' +   // 更新时间
                            '<td class="operateIcon">' +
                            ' <a href="javascript:void (0)" class="deleteBtn"><i class="iconfont">&#xe601;</i></a> ' +
                            '<a href="#" class="changeBtn"><i class="iconfont">&#xe630;</i></a>' +
                            ' </td>'+
                            '</tr>'
                    }

                    tbody.html(str);
                }
                else if(status == 410){
                    notie.alert(2, '暂无数据', 2);
                    tbody.html();
                }
            }
            //显示分页
            laypage({
                cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: arr.data.page, //通过后台拿到的总页数
                curr: curr || 1, //当前页
                jump: function(obj, first){ //触发分页后的回调
                    if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                        searchPageLoad(obj.curr,putawayStatus,searchCon);
                    }
                },
                first:false,
                last:false
            });

        },
        error:function () {
            notie.alert(3, '服务器忙，请稍后重试', 2);
        }
    })
}

//  点击搜索  按条件搜索
$(".searchIcon a").click(function () {
    var searchCon = $("#search").val();
    searchPageLoad(1,1,searchCon);
});

//  监听 回车键 搜索
$("#search").keyup(function(event){
    if(event.keyCode == 13){
        var searchCon = $("#search").val();
        console.log(searchCon);
        searchPageLoad(1,1,searchCon);
    }
});

//  监听搜索框中的值，如果值为空，重新请求

$('#search').bind('input propertychange', function() {
    if($(this).val()==""){
        searchPageLoad(1,1,"");
    }
});