indexHtml.controller('orderStatisticsCtrl', function($scope, $routeParams, $http, cpjAjax, layer) {
	$scope.breadCrumbs = [{
		name: "数据中心",
		url: "#/orderStatistics",
	}, {
		name: "订单统计",
		url: "javascript:;",
	}];

	$scope.mestartDateTime = function() {
		var self = document.getElementById("uintstartDateTime");
		var startDateTime = laydate({
			elem: self,
			istime: true,
			min: '2016-06-16 23:59:59',
			max: laydate.now(),
			start: laydate.now(-2), //开始时间为两天前
			choose: function(datas) {
				$scope.uintstartDateTime = datas
			}
		});
	}
	$scope.meendDateTime = function() {
		var self = document.getElementById("uintendDateTime");
		var endDateTime = layui.laydate({
			elem: self,
			istime: true,
			min: '2016-06-16 23:59:59',
			max: laydate.now(),
			start: laydate.now(-2), //开始时间为两天前
			choose: function(datas) {
				$scope.uintendDateTime = datas
			}
		});
	}
	
	$scope.returnstartDateTime = function() {
		var self = document.getElementById("returnstartDateTime");
		var startDateTime = laydate({
			elem: self,
			istime: true,
			min: '2016-06-16 23:59:59',
			max: laydate.now(),
			start: laydate.now(-2), //开始时间为两天前
			choose: function(datas) {
				$scope.returnSDateTime = datas
			}
		});
	}
	
	$scope.returnendDateTime = function() {
		var self = document.getElementById("returnendDateTime");
		var endDateTime = layui.laydate({
			elem: self,
			istime: true,
			min: '2016-06-16 23:59:59',
			max: laydate.now(),
			start: laydate.now(-2), //开始时间为两天前
			choose: function(datas) {
				$scope.returnEDateTime = datas
			}
		});
	}
	
	$scope.exchangestartDateTime = function() {
		var self = document.getElementById("exchangestartDateTime");
		var startDateTime = laydate({
			elem: self,
			istime: true,
			min: '2016-06-16 23:59:59',
			max: laydate.now(),
			start: laydate.now(-2), //开始时间为两天前
			choose: function(datas) {
				$scope.exchangeSDateTime = datas
			}
		});
	}
	
	$scope.exchangeendDateTime = function() {
		var self = document.getElementById("exchangeendDateTime");
		var endDateTime = layui.laydate({
			elem: self,
			istime: true,
			min: '2016-06-16 23:59:59',
			max: laydate.now(),
			start: laydate.now(-2), //开始时间为两天前
			choose: function(datas) {
				$scope.exchangeEDateTime = datas
			}
		});
	}

	$scope.cargoStatistics = function(startTime, endTime, mytype) {
		cpjAjax.ajax({
			url: '/goodsStatistics/statistics.json',
			method: "POST",
			headers: {
				"authorization": "Mw5Aag5Xcta9H2JIxhUmxzpiYkP9ku6aw084AcaSOoBQNvfA69+BDVgRXCc=",
				"user-agents": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36ZHUMENGYUNWEBBROKERPC"
			},
			data: {
				merchantId: localStorage.getItem("scUserId"),
				startTime: startTime,
				endTime: endTime,
				type: mytype
			},
			success: function(data) {
				if(data.datas.length!=0){
					unitshipmentForm(data, mytype); //统计表	
				}else{
					if(startTime!="" && endTime!=""){
						layer.msg("暂无数据");
					}else if(document.getElementById("unitshipment").children.length == 0){
						document.getElementById("unitshipment").innerHTML= "<span class='zwtj'>暂无数据</span>";
					}else if(document.getElementById("returnvolume").children.length == 0){
						document.getElementById("returnvolume").innerHTML= "<span class='zwtj'>暂无数据</span>";
					}else if(document.getElementById("exchange").children.length == 0){
						document.getElementById("exchange").innerHTML= "<span class='zwtj'>暂无数据</span>";
					}					
				}
			},
			error: function(code, msg) {
				layer.msg(msg);
			}
		});
	}
	$scope.cargoStatistics('', '', 1); //出货量统计
	$scope.cargoStatistics('', '', 2); //退货量统计
	$scope.cargoStatistics('', '', 3); //换货量统计
	
	$scope.unitchaxun = function(){ //出货量统计查询
		$scope.cargoStatistics($scope.uintstartDateTime,$scope.uintendDateTime,1);
	}
	$scope.returnchaxun = function(){ //退货量统计查询
		$scope.cargoStatistics($scope.returnSDateTime,$scope.returnEDateTime,2);
	}
	$scope.exchangechaxun = function(){ //退货量统计查询
		$scope.cargoStatistics($scope.exchangeSDateTime,$scope.exchangeEDateTime,3);
	}
});

function unitshipmentForm(data, mytype) {
	var arr = [];
	if(mytype == 1) {
		var InitializationID = 'unitshipment';
		var mytext = '商品出货量条形统计图';
		var myname = '出货量';
		var mycolor = '#91c7af';
		arr.push(myname);
	} else if(mytype == 2) {
		var InitializationID = 'returnvolume';
		var mytext = '商品退货量条形统计图';
		var myname = '退货量';
		var mycolor = '#d58364';
		arr.push(myname);
	} else if(mytype == 3) {
		var InitializationID = 'exchange';
		var mytext = '商品换货量条形统计图';
		var myname = '换货量';
		var mycolor = '#60a1a9';
		arr.push(myname);
	}
	var myChart = echarts.init(document.getElementById(InitializationID));
	var commodityName = []; //商品名称
	var totalQuantityOfGoods = []; //商品统计数据
	for(var i = 0; i < data.datas.length; i++) {
		commodityName.push(data.datas[i].goodsName);
		totalQuantityOfGoods.push(data.datas[i].goodsId);
	}
	var option = {
		title: {
			text: mytext
		},
		tooltip: {
			show: true,
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: arr
		},
		xAxis: {
			data: commodityName,
			axisLabel: {
				show: true,
				interval:0,
				formatter: function(val) {
					return val.substring(0,5);
				}
			}
		},
		yAxis: {},
		series: [{
			name: myname,
			type: 'bar',
			data: totalQuantityOfGoods,
			barMaxWidth: 30,
			itemStyle: {
				normal: {
					color: mycolor
				}
			}
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}