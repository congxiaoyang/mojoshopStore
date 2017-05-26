/**
 * Created by dell on 2017/4/12.
 */

var objUrl;
var imgBase64="";
$("#file").click(function () {
    // $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    $("#file").on("change",function(){

        objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $("#storeLogo").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
        }else{
            alert("请选择小于2M的图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            imgBase64 = this.result; //就是base64
        }

    });
});



// 商品分类级联

$(".firstClassification").change(function () {
    $(".secClassification").html("");
    var firstClassification = $(this).children('option:selected').val();
    console.log(firstClassification);

    var optionList1 = '<option value="1">机票</option> <option value="2">签证</option> <option value="3">留学</option>';

    var optionList2 = '<option value="4">家政</option> <option value="5">宠物</option> <option value="6">旅行社</option><option value="7">酒店</option><option value="8">搬家</option>' +
        '<option value="9">律师</option><option value="10">租车</option>';

    var optionList3 = '<option value="11">书籍</option> <option value="12">食品</option> <option value="13">服装</option><option value="14">保健用品</option><option value="15">时尚用品</option><option value="16">化妆品</option><option value="17">代购</option><option value="18">保险</option>';
    switch (firstClassification){
        case "1": $(".secClassification").html(optionList1); break;  //留学
        case "2": $(".secClassification").html(optionList2); break;
        case "3": $(".secClassification").html(optionList3); break;
    }
});



//  店铺所销售地区选择

$("#saleAddr").change(function () {
    $("div.city_select").find("input[type='checkbox']").prop("checked",false);
    console.log($(this).find("option:selected").val());
    var selectCountry = $(this).find("option:selected").val();
    if (selectCountry==1) {
        $("#America").removeClass("hidden").siblings("div.city_select").addClass("hidden");
    }else if(selectCountry==2){
        $("#English").removeClass("hidden").siblings("div.city_select").addClass("hidden");
    }else{
        $("#Canada").removeClass("hidden").siblings("div.city_select").addClass("hidden");
    }
});




// 点击注册 ，向后台发送数据

// 验证邮箱

var emailTF = 0;

$("#email").blur(function () {
    var email = $.trim($(this).val());
    var _this = $(this);
    //验证邮箱格式的js正则表达式
    var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    //清空显示层中的数据
    $(".msgHint").html("");

    if (email == "") {
        $(this).siblings("span").html("邮箱不能为空");
    }
    else if (!(isEmail.test(email))) {
        $(this).siblings("span").html("邮箱格式不正确");
    }else{

        $.ajax({
            type:"get",
            url:"http://192.168.1.111:8097/store/reg/checkData",
            dataType:"json",
            data:{"data":email,"type":1},
            timeout:5000,
            success:function (arr) {
                if(arr.status==200){
                    emailTF = 1;
                }else{
                    _this.siblings("span").html("邮箱已被注册");
                }
            },
            error:function () {
                notie.alert(3, '服务器忙，请稍后重试', 2);
            }
        })

    }
});

// 验证密码

var pwdTF = 0;
$("#pwd").blur(function () {
    var pwdReg = /^[a-z0-9_-]{8,16}$/;
    // var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
    var pwd = $(this).val();
    if(!pwdReg.test(pwd)){
        $(this).siblings("span").html("密码格式错误");
    }else{
        pwdTF = 1;
    }
});


// 密码确认验证

var confirmPwdTF = 0;
$("#confirmPwd").blur(function () {
    var pwd = $("#pwd").val();
    var pwd_confirm = $(this).val();
    if(pwd_confirm!=pwd){
        $(this).siblings("span").html("两次输入密码不一致，请检查");
    }else if(pwd_confirm==""){
        $(this).siblings("span").html("密码不能为空");
    }
    else{
        confirmPwdTF = 1;
    }
});


$("#sendCodeToEmail").click(function() {


    //   60s  验证码
    var countdown=60;
    function settime() {
        if (countdown == 0) {
            $("#sendCodeToEmail").removeClass("disabled").html("发送验证码到邮箱");
            countdown = 60;
            return;
        } else {

            $("#sendCodeToEmail").addClass("disabled").html("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function() {
                settime($("#sendCodeToEmail")) }
            ,1000)
    }



    console.log(pwdTF);
    console.log(confirmPwdTF);
    //获取id对应的元素的值，去掉其左右的空格
    var email = $.trim($('#email').val());
    //验证邮箱格式的js正则表达式
    var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    //清空显示层中的数据
    $(".msgHint").html("");

    if (email == "") {
        $("#email").siblings("span").html("邮箱不能为空");
    }
    else if (!(isEmail.test(email))) {
        $("#email").siblings("span").html("邮箱格式不正确");
    }
    else if(pwdTF==0||confirmPwdTF==0){
        $("#pwd").siblings("span").html("密码有误");
    }
    else {

        $("#email").siblings("span").html("").addClass("true").html("验证码已发送");
        // 这里调用接口
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8097/store/reg/checkEmail",
            dataType:"json",
            data:{"email":email},
            timeout:5000,
            success:function (arr) {
                if(arr.status==200){
                    settime();
                }else{
                    notie.alert(3, '服务器忙，请稍后重试', 2);
                    // $("#myModal").removeClass("in");
                    // var html = '<li class="pl-20"><a href="">' + arr.data.userName +'</a></li> <li class="pl-40"><a href="">客服服务</a></li>';
                    // $("#headNav").html(html);
                }
            },
            error:function () {
                notie.alert(3, '服务器忙，请稍后重试', 2);
            }
        })

    }

});



// 真实姓名
var realNameTF=0;
$("#realName").blur(function () {
    var realNameReg = /^([\u4e00-\u9fa5]+|([a-z]+\s?)+)$/;
    var _this = $(this).val();
    if(!realNameReg.test(_this)||_this == ""){
        $(this).siblings("span").html("真实姓名格式错误或者为空");
    }else{
        realNameTF = 1;
    }
});


// 身份证号验证

var idCardTF=0;
$("#idCard").blur(function () {
    var pwdReg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
    var idCard = $(this).val();
    if(!pwdReg.test(idCard)||idCard ==""){
        $(this).siblings("span").html("身份证格式错误或者为空");
    }else{
        idCardTF = 1;
    }
});

var phoneTF=0;
$("#phone").blur(function () {
    var pwdReg = /^[0-9]*$/;
    var phone = $(this).val();
    if(!pwdReg.test(phone)||phone ==""){
        $(this).siblings("span").html("手机号格式错误或者为空");
    }else{
        phoneTF = 1;
    }
});

var reservePhoneTF=0;
$("#reservePhone").blur(function () {
    var pwdReg = /^[0-9]*$/;
    var phone = $(this).val();
    if(!pwdReg.test(phone)||phone ==""){
        $(this).siblings("span").html("手机号格式错误或者为空");
    }else{
        reservePhoneTF = 1;
    }
});



// 所有输入框 焦点事件时去掉 提示信息

$(".form-group input").focus(function () {
    $(this).siblings("span").html("");
});

// 点击 入驻按钮，将信息传递到后台

$("#enterSubmit").click(function () {
    var email = $("#email").val();
    var pwd = $("#pwd").val();
    var confirmPwd = $("#confirmPwd").val();
    var code = $("#code").val();
    var realName = $("#realName").val();
    var idCard = $("#idCard").val();
    var phone = $("#phone").val();
    var addr = $("#addr").val();
    var storeName = $("#storeName").val();
    var reservePhone = $("#reservePhone").val();

    var selectedOption = $(".firstClassification").find("option:selected").val();
    var selectedSecOption = $(".secClassification").find("option:selected").text();

    var storeType = $("#storeType").find("option:selected").val();
    var succ = $("#succ").val();

    var str = "";
    var salrAddrArray = new Array();
    $("input[name=city]:checked").each(function () {
        var saleAddrItem = $(this).val();
        salrAddrArray.push(saleAddrItem);
    });
    for(var i=0;i<salrAddrArray.length;i++){
        str = str + '"' + salrAddrArray[i] + '",';
    }
    str=str.substring(0,str.length-1);
    var strResult = "["+ str+"]";

    var country = $("#saleAddr").find("option:selected").val();


    if (emailTF ==1 && pwdTF ==1 && confirmPwdTF == 1 && idCardTF ==1 && phoneTF == 1 && reservePhoneTF == 1 && realNameTF ==1 && storeName!="" && strResult!= "[]"){
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8097/store/reg/register",
            dataType:"json",
            data:{
                "email":email,
                "password":pwd,
                "emailCheck":code,
                "name":realName,
                "card":idCard,
                "tel":phone,
                "liveAddress":addr,
                "storeName":storeName,
                "storeType":storeType,
                "cateType":selectedOption,                                      // 商品分类
                "cateName":selectedSecOption,
                "citys":strResult,
                "countryName":country,
                "creditNoCode":succ,
                "file":imgBase64
            },
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            timeout:5000,
            success:function (arr) {
                if(arr.status==200){
                    notie.alert(1, '注册成功!', 2);

                    $.ajax({
                        url: CONFIG.url+'/api/createDemoUser',
                        type: 'POST',
                        data: {
                            "email":email,
                            "password":pwd
                        },
                        contentType: 'application/x-www-form-urlencoded',
                        beforeSend: function (req) {
                            req.setRequestHeader('appkey', CONFIG.appkey);
                        },
                        success: function(data) {
                            if (data.res === 200) {
                                alert("云信聊天服务配置好了");
                                window.location.href = '../../login/login.html';
                            }else{
                                notie.alert(3, '聊天服务繁忙，请稍后重试', 2);
                            }
                        },
                        error: function() {
                            notie.alert(3, '聊天服务繁忙，请稍后重试', 2);
                        }
                    });


                }else{
                    // window.location.href = "../../../login/login.html";

                    notie.alert(3, '服务器忙，请稍后重试', 2);
                }
            },
            error:function () {
                notie.alert(3, '服务器忙，请稍后重试', 2);
            }
        })
    }else{
        notie.alert(2, '请填写完整信息', 2);
    }

});


