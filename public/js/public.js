/**
 * Created by dell on 2017/4/5.
 */

// 读取cookie值, 获取商铺的id

function get_cookie(Name) {
    var search = Name + "=";  //查询检索的值
    var returnvalue = "";//返回值
    if (document.cookie.length > 0) {
        sd = document.cookie.indexOf(search);
        if (sd!= -1) {
            sd += search.length;
            end = document.cookie.indexOf(";", sd);
            if (end == -1)
                end = document.cookie.length;
            //unescape() 函数可对通过 escape() 编码的字符串进行解码。
            returnvalue=unescape(document.cookie.substring(sd, end))
        }
    }
    return returnvalue;
}


//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}


//  点击用户名，下拉出来二级菜单

$("#userName").click(function () {
    $("ul.subnav").toggleClass("hide");
});


var storeName;
var storeId;
function load() {

    //    商户端头部文字line-height 非固定，此处设置他的动态line-height
    var logoH = $(".storeHead .headInner .logo img").height();
    var winW = $(window).width();
    var winH = $(window).height();
    var headH = $(".storeHead").height();
    var  mainW;
    var leftMenuW = $(".main-sidebar").width();
    if(winW>1280){
        mainW = winW - leftMenuW;
    }else{
        mainW = 1280- leftMenuW;
    }


    // $(".storeMain").css({"width":mainW,"top":headH,"left":leftMenuW});
    var squareBoxW = $(".squareBox").width();
    $(".squareBox").css("height",squareBoxW);
    var mainH = $(".storeMain").height();

    $("aside.main-sidebar").css({"height":mainH,"min-height":(winH-headH)});

    //    左侧导航栏要等于右侧的高度

    console.log("主体内容高度:"+ mainH);
    console.log("屏幕高度:"+winH);
    console.log("头部高度:"+headH);
    console.log( "可视高度:"+ (winH-headH));
}



$.extend({'headLoad':function (src) {


    // 获取 token  得到用户信息
    var token = get_cookie("token");
    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8097/store/reg/token",
        dataType:"json",
        data:{"token":token},
        async:false,
        success:function (arr) {
            if(arr.status == 200){
                storeName = arr.data.mjStore.storeName;
                logo = arr.data.logo;
                var token_id = arr.data.mjStore.id;
                // console.log("id: " +token_id);
                document.cookie = "id="+ token_id;
                document.cookie = "avatar=" + arr.data.logo;  // avatar
                document.cookie = "cilentIm=" + arr.data.mjStore.cilentIm;   //  yxId
                document.cookie = "storeName=" + decodeURIComponent(escape(storeName));

                // decodeURIComponent(escape(username));
            }
        },
        error:function () {
            notie.alert(3, '服务器忙，请稍后重试', 2);
        }
    });
    
    var publicHead = '<div class="headInner clearfix"> ' +
        '<div class="logo fl"> ' +
        '<a href="#"><img src="' + src+'public/images/logo.png" alt=""></a>' +
        '</div> ' +
        '<div class="fr"> ' +
        '<div class="col-lg-3 col-md-3 col-sm-3 text-left">' +
        ' <a href="#">帮助中心</a> ' +
        '</div> ' +
        '<div class="col-lg-3 col-md-3 col-sm-3 userImg text-center"> <img src="'+ logo +'" alt=""> ' +
        '</div>' +
        '<div class="col-lg-6 col-md-6 col-sm-6 text-right">' +
        '<a href="javascript:void (0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span id="userName" >'+ storeName +'</span>  <i class="iconfont">&#xe62d;</i></a> <ul class="dropdown-menu"> <li><a href="'+src+'login/changePwd.html">更改密码</a></li><li><a href="#" id="logOut">退出登录</a></li> </ul> </div> </div> </div>';

    $(".storeHead").html(publicHead);

}});

$(function () {

    // 正方形的盒子的高度要等于他本身的宽度
    load();

});

$(window).resize(function () {
    load();
});

//　　左侧导航栏　

$.sidebarMenu = function(menu) {
    var animationSpeed = 300;

    $(menu).on('click', 'li a', function(e) {
        var $this = $(this);
        var checkElement = $this.next();

        if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function() {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent("li").removeClass("active");
        }

        //If the menu is not visible
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            //Get the parent menu
            var parent = $this.parents('ul').first();
            //Close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            //Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            //Get the parent li
            var parent_li = $this.parent("li");

            //Open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function() {
                //Add the class active to the parent li
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');
            });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
        }
    });
};

$.sidebarMenu($('.sidebar-menu'));

//  点击左侧菜单栏一级菜单时， 向右的箭头要向下显示

$(".treeview>a").click(function () {

    $(this).find("i").toggleClass("active");

});


//  点击用户名 ，弹出更改子菜单

$(".dropdown-toggle").click(function () {
    $(this).siblings("ul.dropdown-menu").toggleClass("hide")
});


//  时间戳转成时间

function ge_time_format(timestamp){
    if(timestamp){
        var date = new Date(timestamp);
    }else{
        var date = new Date();
    }
    Y = date.getFullYear(),
        m = date.getMonth()+1,
        d = date.getDate(),
        H = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
    if(m<10){
        m = '0'+m;
    }
    if(d<10){
        d = '0'+d;
    }
    if(H<10){
        H = '0'+H;
    }
    if(i<10){
        i = '0'+i;
    }
    if(s<10){
        s = '0'+s;
    }
    var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
    return t;
}

//  点击伪下拉菜单

$(function(){
    // 默认显示

    $(".pubList").find($(".dropdown-toggle")).dropdown();

    $(".pubList").find($(".dropdown-menu li")).click(function () {
        $(this).parents(".dropdown-menu").addClass("hide");
    });
});

//  自动给整数加上.00  的函数

function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return "";
    }
    var f = Math.round(x*100)/100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}


//  商品价格输入焦点消失时，自动补上 .00

$("#price").blur(function () {
    var price = $(this).val();
    $(this).val(toDecimal2(price));
});

// 读取cookie值, 获取商铺的id

function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

// 点击退出登录时，要删除所有的cookie

function clearCookie(cookieName)
{
    if(document.cookie.length>0){
        if(document.cookie.indexOf(cookieName+"=")!= -1){
            var date = new Date();
            date.setDate(date.getDate() - 1);
            document.cookie = cookieName+"="+getCookie(cookieName)+";expires=" +date.toUTCString();
            console.log(cookieName+" 清理完成");
            // window.location.href = "../../../mojoshopStore/login/login.html"
        }
        else console.log("cookie 中"+cookieName + "字段不存在")
    }
    else console.log("当前没有cookie存储");
}

$("body").delegate("#logOut","click",function () {

    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8097/store/reg/loginOut",
        dataType:"json",
        data:{},
        success:function (arr) {
            if(arr.status == 200){
                clearCookie("token");
                window.location.href = "../../../mojoshopStore/login/login.html";

            }
        },
        error:function () {
            notie.alert(3, '退出失败，服务器忙，请稍后重试', 2);
        }
    });

});










