/**
 * Created by dell on 2017/4/24.
 */


// 分页 加载数据函数
function pageLoad(curr,status) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8097/store/evaluate/search",
        dataType:"json",
        async:false,
        data:{
            "page":curr || 1,
            "storeId":getCookie("id"),   //id
            "rows":20,    //显示的行数
            "status":status
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            $(".tableHint_netError").addClass("hidden");

            var data = arr.data.evaluation;   //  数据
            var tbody = $("#evaluate_body");  //  tbody;
            var str;
            tbody.html("");
            if(arr.status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{

                    for(var i in data){
                        var dataStatus;     //上架状态 或者 是下架状态
                        if(data[i].status == 1){
                            dataStatus = "上架";
                        }else{
                            dataStatus = "下架";
                        }

                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td><img src="' + data[i].image + '" alt="图片加载失败"></td> ' +
                            '<td>'+ data[i].title +'</td> ' +    //商品名称
                            '<td>'+ data[i].rated+'星</td> ' +   // 评价等级
                            '<td>'+data[i].content+'</td> ' +    //  评价内容
                            '<td>' + data[i].userName + '</td>'+   // 用户昵称
                            ' <td>'+ data[i].userCode +'</td> ' +    // 用户账号
                            '<td> <p>'+ge_time_format(data[i].createTime)+'</p></td>' +   //  评价时间
                            '</tr>'
                    }

                    tbody.html(str);
                }

            }else{
                $(".tableHint_dataError").removeClass("hidden");
                notie.alert(3, '服务器繁忙，请稍后再试', 2);
            }
            //显示分页
            laypage({
                cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: arr.data.pages, //通过后台拿到的总页数
                curr: curr || 1, //当前页
                jump: function(obj, first){ //触发分页后的回调
                    if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                        pageLoad(obj.curr,status);
                    }
                },
                first:false,
                last:false
            });

        },
        error:function () {
            $("#evaluate_body").html("");
            notie.alert(3, '服务器繁忙，请稍后再试', 2);
        }
    })
}

$(function () {
    pageLoad(1,"");
});


//  点击评价等级下拉菜单，按需搜索



$(".status_search").click(function () {

    var status = $(this).attr("data-value");

    pageLoad(1,status);

});


//  ===========================================================  搜索  ============================================

//  搜索函数
function searchPageLoad(curr,searchCon) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8097/store/evaluate/search",
        dataType:"json",
        data:{
            "page":curr || 1,
            "storeId":getCookie("id"),   //id
            "rows":20,    //显示的行数
            "search":searchCon    // 搜索内容
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            $(".tableHint_netError").addClass("hidden");
            var status = arr.status;  // 返回状态值;
            var data = arr.data.evaluation;   //  数据;
            var tbody = $("#evaluate_body");  //  tbody;
            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    $(".tableHint_dataError").addClass("hidden");
                    for(var i in data){
                        var dataStatus;     //上架状态 或者 是下架状态
                        if(data[i].status == 1){
                            dataStatus = "上架"
                        }else{
                            dataStatus = "下架"
                        }

                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td><img src="' + data[i].image + '" alt="图片加载失败"></td> ' +
                            '<td>'+ data[i].title +'</td> ' +    //商品名称
                            '<td>'+ data[i].rated+'星</td> ' +   // 评价等级
                            '<td>'+data[i].content+'</td> ' +    //  评价内容
                            '<td>' + data[i].userName + '</td>'+   // 用户昵称
                            ' <td>'+ data[i].userCode +'</td> ' +    // 用户账号
                            '<td> <p>'+ge_time_format(data[i].createTime)+'</p></td>' +   //  评价时间
                            '</tr>'
                    }

                    tbody.html(str);
                }

            }else{
                notie.alert(3, '服务器繁忙，请稍后再试', 2);
            }
            //显示分页
            laypage({
                cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: arr.data.pages, //通过后台拿到的总页数
                curr: curr || 1, //当前页
                jump: function(obj, first){ //触发分页后的回调
                    if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                        searchPageLoad(obj.curr,searchCon);
                    }
                },
                first:false,
                last:false
            });

        },
        error:function () {
            notie.alert(3, '服务器繁忙，请稍后再试', 2);
        }
    })
}

//  点击搜索  按条件搜索
$(".searchIcon a").click(function () {
    var searchCon = $("#search").val();
    searchPageLoad(1,searchCon);
});

//  监听 回车键 搜索
$("#search").keyup(function(event){
    if(event.keyCode == 13){
        var searchCon = $("#search").val();
        console.log(searchCon);
        searchPageLoad(1,searchCon);
    }
});


