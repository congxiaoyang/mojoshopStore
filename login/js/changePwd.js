/**
 * Created by dell on 2017/5/19.
 */

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
        emailTF = 1;
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
    if(!pwdReg.test(pwd)||pwd == ""){
        $(this).siblings("span").html("密码格式错误或者为空");
        pwdTF = 0;
    }else{
        pwdTF = 1;
    }
});


// 密码确认验证

var pwdConfirmTF = 0;
$("#confirmPwd").blur(function () {
    var pwd = $("#pwd").val();
    var pwd_confirm = $(this).val();
    if(pwd_confirm!=pwd){
        $(this).siblings("span").html("两次输入密码不一致，请检查");
        pwdConfirmTF = 0
    }else if(pwd_confirm==""){
        $(this).siblings("span").html("密码不能为空");
        pwdConfirmTF =  0
    }else{
        pwdConfirmTF = 1
    }
});


// 所有输入框 焦点事件时去掉 提示信息

$(".form-group input").focus(function () {
    $(this).siblings("span").html("");
});


//  点击完成按钮 ，向后台传送数据

$("#submit").click(function () {
    var email = $.trim($('#email').val());
    var pwd = $("#pwd").val();
    var name = $("#name").val();
    var code = $("#code").val();
    if(emailTF==1&&pwdTF==1&&pwdConfirmTF==1){
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8097/store/reg/updatepwd",
            dataType:"json",
            data:{"email":email,"password":pwd,"emailCheck":code},
            timeout:5000,
            success:function (arr) {
                if(arr.status==400){
                    notie.alert(3, '服务器忙，请稍后重试', 2);
                }else if(arr.status==200){
                    notie.alert(1, '修改完成', 2);
                    window.location.href = "../../../login/login.html";
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