/**
 * Created by dell on 2017/4/17.
 */

//  基本信息修改页面  先加载基本信息到输入框中
var cateType;
var cateName;
var email;
$(function () {
    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8097/store/msg/search/infoCenter",
        dataType:"json",
        data:{"storeId":getCookie("id")},
        async:false,
        timeout:5000,
        success:function (arr) {

            if(arr.status == 200){

                var data = arr.data;

                $("#name").val(data.userName);
                $("#email").html(data.email);
                $("#phone").val(data.tel);
                $("#reservePhone").val(data.reserveNo);
                $("#idCard").val(data.card);
                $("#passport").val(data.passPortNo);
                $("#addr").val(data.address);
                $("#succ").val(data.creditNoCode);
                cateType = data.cateType;
                cateName = data.cateName;
                email = data.email;

                $("#cateType").val(cateType);
                $("#cateName").val(cateName);
                $("#email_back").val(email);

                // 商品分类
                var fatherType;
                switch(data.cateType){
                    case 1: fatherType = "留学/出境";
                        break;
                    case 2: fatherType = "生活服务";
                        break;
                    case 3: fatherType = "时尚购物";
                        break;
                }

                $("#firstClassification").html('<option value="1">留学/出境</option> <option value="2">生活服务</option> <option value="3">时尚购物</option>');
                $("#firstClassification option").each(function (){
                    if($(this).val()==data.cateType){
                        $(this).attr("selected",true);
                    }});

                // $("#firstClassification").html('<option>'+fatherType+'</option>');

                $("#secClassification").html('<option value="'+data.cateName+'">'+data.cateName+'</option>')

                $("#operatingLicense").val(data.operatingLicense);

                console.log(data.citys);
                var saleArea = data.citys.join(",");
                console.log(saleArea);

                $(".filter-option").text(saleArea);
                $(".selectpicker").attr("title",saleArea);



            }else{
                notie.alert(3, '服务器忙，请稍后重试', 2);
            }
        },
        error:function () {
            notie.alert(3, '服务器忙，请稍后重试', 2);
        }
    });
});


//  bs 表单验证

$(document).ready(function() {

    $('#basicInfoForm').bootstrapValidator({
//        live: 'disabled',
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {

            userName: {
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    },
                    regexp:{
                        regexp:/^([\u4e00-\u9fa5]+|([a-z]+\s?)+){2,}$/,
                        message: '姓名格式不正确'
                    }
                }
            },
            tel: {
                validators: {
                    notEmpty: {
                        message: '手机不能为空'
                    },
                    regexp: {
                        regexp: /^1[34578]\d{9}$/,
                        message: '填写正确的手机号'
                    }
                }
            },
            reserveNo: {
                validators: {
                    notEmpty: {
                        message: '手机不能为空'
                    },
                    regexp: {
                        regexp: /^1[34578]\d{9}$/,
                        message: '填写正确的手机号'
                    }
                }
            },
            card: {
                validators: {
                    notEmpty: {
                        message: '身份证号不能为空'
                    },
                    regexp: {
                        regexp: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                        message: '身份证号格式不正确'
                    }
                }
            },
            address: {
                validators: {
                    notEmpty: {
                        message: '居住地址不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();

        $("#storeId").val(getCookie("id"));

        // var saleAddr = $(".filter-option").text();
        // console.log(saleAddr);
        //
        // var saleAddrArray = saleAddr.split(", ");
        // var str = "";
        // for(var i=0;i<saleAddrArray.length;i++){
        //     str = str + '"' + saleAddrArray[i] + '",';
        // }
        // str=str.substring(0,str.length-1);
        // console.log("["+str+"]");
        // $("#city").val("["+str+"]");
        // console.log($("#city").val());


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



        // Get the form instance
        var $form = $(e.target);

        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');

        // Use Ajax to submit form data
        $.post('http://192.168.1.111:8097/store/msg/update/infoCenter', $form.serialize(), function(result) {

            if(result.status == 200){
                notie.alert(1, '修改成功', 2);
            }else{
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
        }, 'json');
    });

});



$("#enterSubmit").click(function () {
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


    if ( idCardTF ==1 && phoneTF == 1 && reservePhoneTF == 1 && realNameTF ==1 && storeName!="" && strResult!= "[]"){
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8097/store/msg/update/infoCenter",
            dataType:"json",
            data:{
                "email":email,
                "name":realName,
                "card":idCard,
                "tel":phone,
                "reserveNo":reservePhone,
                "liveAddress":addr,
                "storeName":storeName,
                "storeType":storeType,
                "cateType":selectedOption,                                      // 商品分类
                "cateName":selectedSecOption,
                "citys":strResult,
                "countryName":country,
                "creditNoCode":succ
            },
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success:function (arr) {
                if(arr.status==200){

                    notie.alert(1, '注册成功!', 2);

                    setTimeout(function () {
                        window.history.back();
                    },800)

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



// 商品分类级联

$(".firstClassification").change(function () {
    $(".secClassification").html("");
    var firstClassification = $(this).children('option:selected').val();

    var optionList1 = '<option value="机票">机票</option> <option value="签证">签证</option> <option value="留学">留学</option>';

    var optionList2 = '<option value="家政">家政</option> <option value="宠物">宠物</option> <option value="旅行社">旅行社</option><option value="酒店">酒店</option><option value="搬家">搬家</option>' +
        '<option value="律师">律师</option><option value="租车">租车</option>';

    var optionList3 = '<option value="书籍">书籍</option> <option value="食品">食品</option> <option value="服装">服装</option><option value="保健用品">保健用品</option><option value="时尚用品">时尚用品</option><option value="化妆品">化妆品</option><option value="代购">代购</option>' +
        '<option value="律师">律师</option><option value="租车">租车</option>';
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

