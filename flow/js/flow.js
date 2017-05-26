/**
 * Created by dell on 2017/4/17.
 */

    // 加载页面时，获取数据
    
    $(function () {
        $.ajax({
            type:"get",
            url:"http://192.168.1.111:8097/store/flow/search",
            dataType:"json",
            async:false,
            data:{"storeId":getCookie("id")},
            timeout:5000,
            success:function (arr) {

                if(arr.status==200){
                    var data1 =  arr.data.M_count;   // 交易金额
                    var data2 =  arr.data.P_count;     // 退款金额
                    var data3 =  arr.data.O_count;    //订总
                    var data4 =  arr.data.C_count;   // 商总
                    var data5 =  arr.data.A_count;   //评价总数
                    var data6 =  arr.data.B_count;   //  广总
                    var data7 = arr.data.R_count;  // 退款总数

                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('chart'));     // 数量饼图
                    var myChart2 = echarts.init(document.getElementById('chart2'));    //  金额饼图

// 指定图表的配置项和数据

                    //  数量饼图配置参数
                    var option = {
                        title : {
                            text: '' +
                            '数量',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ["订单总数","商品总数","评价总数","广告总数","退款总数"]
                        },
                        series : [
                            {
                                name: '数量',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data:[
                                    {value:data3, name:'订单总数'},
                                    {value:data4, name:'商品总数'},
                                    {value:data5, name:'评价总数'},
                                    {value:data6, name:'广告总数'},
                                    {value:data7, name:'退款总数'}
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };

// 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);



                //    金额饼图配置参数

                    var option2 = {
                        title : {
                            text: '' +
                            '金额',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ["交易金额","退款金额"]
                        },
                        series : [
                            {
                                name: '金额',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data:[
                                    {value:data1, name:'交易金额'},
                                    {value:data2, name:'退款金额'}
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };

                    myChart2.setOption(option2);

                }else {
                    notie.alert(3, '服务器繁忙，请稍后重试', 2);
                }
            }
            ,
            error:function () {
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
        });
    });

