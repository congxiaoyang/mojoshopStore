/**
 * Created by dell on 2017/4/19.
 */


$.extend({'menuLoad':function (src) {
    var asideBar = '<section  class="sidebar">'+
            '<ul class="sidebar-menu">'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>店铺信息</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu">'+
        '                    <li><a href="' + src + 'store/store_info.html"><i class="iconfont"></i> 商铺信息</a></li>'+
        '                    <li><a href="' + src + 'store/basic_info.html"><i class="iconfont"></i> 基本信息</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>商品管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu">'+
        '                    <li><a href="' + src + 'goods/search.html"><i class="iconfont"></i> 查询商品 </a></li>'+
        '                    <li><a href="' + src + 'goods/add.html"><i class="iconfont"></i> 增加商品 </a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>广告管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu">'+
        '                    <li><a href="' + src + 'ad/ad_search.html"><i class="iconfont"></i> 查询广告</a></li>'+
        '                    <li><a href="' + src + 'ad/ad_upload.html"><i class="iconfont"></i> 上传广告</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>订单管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu">'+
        '                    <li><a href="' + src + 'order/order_settled.html"><i class="iconfont"></i> 已结算订单</a></li>'+
        '                    <li><a href="' + src + 'order/order_noSettled.html"><i class="iconfont"></i> 未结算订单</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>评价管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu">'+
        '                    <li><a href="' + src + 'evaluate/evaluate.html"><i class="iconfont"></i> 评价查询</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>流量管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu">'+
        '                    <li><a href="' + src + 'flow/flow.html"><i class="iconfont"></i> 流量查询</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>聊天管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu">'+
        '                    <li><a href="' + src + 'chat/im/main.html"><i class="iconfont"></i>聊天列表</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>退款管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu">'+
        '                    <li><a href="' + src + 'refund/refunding.html"><i class="iconfont"></i>退款中</a></li>'+
        '                    <li><a href="' + src + 'refund/refunded.html"><i class="iconfont"></i>已退款</a></li>'+
        '                    <li><a href="' + src + 'refund/notRefund.html"><i class="iconfont"></i>未退款</a></li>'+
        '                </ul>'+
        '            </li>'+
        '        </ul>'+
        '    </section>';

    $(".main-sidebar").html(asideBar);
}});



