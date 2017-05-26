/**
 * Created by dell on 2017/4/12.
 */

$(function () {
    var winH = $(window).height();
    var headH = $("header.register").height()+28;
    console.log(headH);
    $(".loginMain").css("height",winH-headH);
    var regModuleH = $(".loginMain .modal-dialog").height();
    var regModuleW = $(".loginMain .modal-dialog").width();
    $(".loginMain .modal-dialog").css("margin-top",-regModuleH/2);
    $(".loginMain .modal-dialog").css("margin-right",-regModuleW/2);
});


//滑动解锁插件

var sliderValidate = 0;

;
(function($) {
    function Slider(elem, options) {
        this.$container = elem;
        this.default = {
            width: this.$container.width() - 2,
            height: this.$container.height() - 2,
            bgColor: '#E8E8E8',
            progressColor: '#FFE97F',
            handleColor: '#fff',
            succColor: '#78D02E',
            text: 'slide to unlock',
            succText: 'ok!',
            textColor: '#000',
            succTextColor: '#000',
            successFunc: function() {
                sliderValidate = 1;
            }
        };
        this.options = $.extend({}, this.default, options);
        this.isSuccess = false;
    }
    Slider.prototype = {
        create: function() {
            var $container = this.$container;
            var options = this.options;
            initDOM();
            initStyle();

            function initDOM() {
                var template = '<div class="slide-to-unlock-bg"><span>' +
                    options.text +
                    '</span></div><div class="slide-to-unlock-progress"></div><div class="slide-to-unlock-handle"></div>';
                $container.html(template);
            }

            function initStyle() {
                $container.css({
                    position: 'relative',
                });
                $container.find('span').css({
                    lineHeight: options.height + 'px',
                    fontSize: options.height / 3.5,
                    color: options.textColor
                });
                $container.find('.slide-to-unlock-bg').css({
                    width: options.width + 'px',
                    height: options.height + 'px',
                    backgroundColor: options.bgColor,
                });
                $container.find('.slide-to-unlock-progress').css({
                    backgroundColor: options.progressColor,
                    height: options.height - 2 + 'px'
                });
                $container.find('.slide-to-unlock-handle').css({
                    backgroundColor: options.handleColor,
                    height: (options.height - 0) + 'px',
                    lineHeight: (options.height - 0) + 'px',
                    width: (Math.floor(options.width / 8)) + 'px',
                });
            }
        },
        bindDragEvent: function() {
            var that = this;
            var $container = this.$container;
            var options = this.options;
            var downX;
            var $prog = $container.find('.slide-to-unlock-progress'),
                $bg = $container.find('.slide-to-unlock-bg'),
                $handle = $container.find('.slide-to-unlock-handle');
            var succMoveWidth = $bg.width() - $handle.width();
            $handle.on('mousedown', null, mousedownHandler);

            function getLimitNumber(num, min, max) {
                if (num > max) {
                    num = max;
                } else if (num < min) {
                    num = min;
                }
                return num;
            }

            function mousedownHandler(event) {
                downX = event.clientX;
                $(document).on('mousemove', null, mousemoveHandler);
                $(document).on('mouseup', null, mouseupHandler);
            }

            function mousemoveHandler(event) {
                var moveX = event.clientX;
                var diffX = getLimitNumber(moveX - downX, 0, succMoveWidth);
                $prog.width(diffX);
                $handle.css({
                    left: diffX
                });
                if (diffX === succMoveWidth) {
                    success();
                }
                event.preventDefault();
            }

            function mouseupHandler(event) {
                if (!that.isSuccess) {
                    $prog.animate({
                        width: 0
                    }, 100);
                    $handle.animate({
                        left: 0
                    }, 100);
                }
                $(document).off('mousemove', null, mousemoveHandler);
                $(document).off('mouseup', null, mouseupHandler);
            }

            function success() {
                $prog.css({
                    backgroundColor: options.succColor,
                });
                $container.find('span').css({
                    color: options.succTextColor
                });
                that.isSuccess = true;
                $container.find('span').html(options.succText);
                $handle.off('mousedown', null, mousedownHandler);
                $(document).off('mousemove', null, mousemoveHandler);
                setTimeout(function() {
                    options.successFunc && options.successFunc();
                }, 30);
            }
        }
    };
    $.fn.extend({
        slideToUnlock: function(options) {
            return this.each(function() {
                var slider = new Slider($(this), options);
                slider.create();
                slider.bindDragEvent();
            });
        }
    });
})(jQuery);



$("#login").click(function () {
    var email = $("#email").val();
    var pwd = $("#loginPwd").val();
    // var token = '9b33fa97d1b76afddb3f22edf9446e10';

    if(email!=""&&pwd!=""&&sliderValidate==1){
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8097/store/reg/login",
            dataType:"json",
            data:{"email":email,"password":pwd},
            timeout: 5000, //超时时间：30秒
            success:function (arr) {

                if(arr.status == 200){
                    notie.alert(1, '登录成功!', 2);
                    document.cookie = "token = "+ arr.data +"; path=/";
                    window.location.href = "../../../mojoshopStore/store/store_info.html";

                    // function loginChat(account, pwd) {
                    //     setCookie('cy1218');
                    //     //自己的appkey就不用加密了
                    //     // setCookie('sdktoken',pwd);
                    //     // setCookie('sdktoken');
                    //     window.location.href = './main.html';
                    //
                    // }

                }
                else if(arr.status == 400){
                    notie.alert(3, arr.msg , 2);
                }else if(arr.status == 401){
                    notie.alert(3, arr.msg , 2);
                }else if(arr.status == 402){
                    notie.alert(3, arr.msg , 2);
                }

            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                notie.alert(3, '服务器忙，请稍后重试', 2);
            }
        })

    }else{
        notie.alert(2, '请填写完整信息', 2);
    }

});




