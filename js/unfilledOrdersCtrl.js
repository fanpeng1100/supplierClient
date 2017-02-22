indexHtml.controller('unfilledOrdersCtrl', function($scope, $routeParams, $http, $location, cpjAjax, layer, $rootScope, Daochu) {
	$scope.type = $routeParams.type;
	$scope.orderStatus = ''; //订单状态
	$scope.order = {}; //查询表单对象
	$scope.zwsj = false;
	$scope.merchantId = localStorage.getItem("scUserId");
	$scope.timeName = '付款时间';
	var pageSize = 10;
	if($routeParams.type == 1) {
		$scope.breadCrumbs = [{
			name: "订单管理",
			url: "#/returnOrder",
		}, {
			name: "未发货订单",
			url: "javascript:;",
		}];
		$scope.orderStatus = 2; //待发货
		$scope.isShow = true; //发货按钮是否显示
	} else if($routeParams.type == 2) {
		$scope.breadCrumbs = [{
			name: "订单管理",
			url: "#/returnOrder",
		}, {
			name: "已发货订单",
			url: "javascript:;",
		}];
		$scope.orderStatus = 3; //待收货
		$scope.isShow = false; //发货按钮是否显示
	} else if($routeParams.type == 3) {
		$scope.breadCrumbs = [{
			name: "订单管理",
			url: "#/returnOrder",
		}, {
			name: "已完成订单",
			url: "javascript:;",
		}];
		$scope.orderStatus = 5; //已完成
		$scope.isShow = false; //发货按钮是否显示
	}
	//列表
	$scope.getLists = function(curPage, order) {
		cpjAjax.ajax({
			url: '/merchantOrder/list.json',
			method: "POST",
			headers: {
				"authorization": "Mw5Aag5Xcta9H2JIxhUmxzpiYkP9ku6aw084AcaSOoBQNvfA69+BDVgRXCc=",
				"user-agents": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36ZHUMENGYUNWEBBROKERPC"
			},
			data: {
				applyTimeEnd: "",
				applyTimeStart: "",
				goodsName: order.goodsName || "",
				merchantId: $scope.merchantId,
				orderNum: order.orderNum || "",
				orderStatus: $scope.orderStatus,
				pageNum: curPage,
				pageSize: pageSize,
				payTimeEnd: order.applyTimeEnd || "",
				payTimeStart: order.applyTimeStart || "",
				phone: order.phone || ""
			},
			success: function(data) {
				$scope.baseImageUrl = data.baseImageUrl;
				if(data.data.pageNum == 0) {
					$scope.zwsj = false;
				} else {
					$scope.zwsj = true;
				}
				$scope.lists = data.data.list;
				var laypage = layui.laypage,
					layer = layui.layer;
				var nums = pageSize; //每页出现的数据量
				//调用分页
				laypage({
					cont: 'page',
					pages: Math.ceil(data.data.total / nums) //得到总页数
						,
					curr: curPage,
					jump: function(obj, first) {
						if(!first) {
							$scope.getLists(obj.curr, '');
						}
					}
				});
			},
			error: function(code, msg) {
				layer.msg(msg);
			},
			timeout: function() {}
		});
	}
	$scope.getLists(1, $scope.order);
	//查询按钮
	$scope.chaxun = function() {
			$scope.getLists(1, $scope.order);
		}
		//刷新
	$scope.refresh = function() {
			$scope.getLists(1, $scope.order);
		}
		//发货
	$scope.fahuo = function(subOrderId) {
			fahuo(cpjAjax, $scope, subOrderId, $location);
		}
		//导出
	$scope.export = function() {
		layer.open({
			title: "导出订单",
			content: "确定导出此条件下订单",
			skin: 'exportDialog',
			closeBtn: 2,
			btn: ["确定", "取消"],
			yes: function(index) {
				Daochu.daochu();
				layer.close(index);
			}
		});
	}
});
/*
 详情controller
 * */
indexHtml.controller('orderDetailCtrl', function($scope, $routeParams, $http, cpjAjax, $rootScope, layer, $location) {
	$scope.order = ''; //订单对象
	$scope.orderStatus = '' //发货状态
	$scope.invoiceType = ''; //发票类型
	$scope.wuliuInfo = ''; //物流信息
	$scope.merchantId = localStorage.getItem("scUserId");
	$scope.zwsj = true;
	if($routeParams.type == 1) {
		$scope.breadCrumbs = [{
			name: "订单管理",
			url: "#/returnOrder",
		}, {
			name: "未发货订单",
			url: "#/unfilledOrdersCtrl/1",
		}, {
			name: "订单详情",
			url: "javascript:;",
		}];
		$scope.isShow = true;
	} else if($routeParams.type == 2) {
		$scope.breadCrumbs = [{
			name: "订单管理",
			url: "#/returnOrder",
		}, {
			name: "已发货订单",
			url: "#/unfilledOrdersCtrl/2",
		}, {
			name: "订单详情",
			url: "javascript:;",
		}];
		$scope.isShow = false;
	} else if($routeParams.type == 3) {
		$scope.breadCrumbs = [{
			name: "订单管理",
			url: "#/returnOrder",
		}, {
			name: "已完成订单",
			url: "#/unfilledOrdersCtrl/3",
		}, {
			name: "订单详情",
			url: "javascript:;",
		}];
		$scope.isShow = false;
	}
	cpjAjax.ajax({
		url: '/merchantOrder/subOrderDetail.json',
		method: "POST",
		data: {
			merchantId: $scope.merchantId,
			subOrderId: $routeParams.subOrderId
		},
		success: function(data) {
			$scope.order = data.data;
			if(data.data.orderStatus == 2) {
				$scope.orderStatus = '未发货';
			} else if(data.data.orderStatus == 3) {
				$scope.orderStatus = '已发货';
			} else if(data.data.orderStatus == 5) {
				$scope.orderStatus = '已完成';
			}

			if(data.data.invoiceType == 1) {
				$scope.invoiceType = "普通发票";
			} else if(data.data.invoiceType == 2) {
				$scope.invoiceType = "电子发票";
			} else if(data.data.invoiceType == 3) {
				$scope.invoiceType = "增值税发票";
			}
			$scope.order.pic = data.baseImageUrl + data.data.goodsPic;
//			console.log(data.data.userId);
			getWuliuInfo($scope, cpjAjax, data.data.expressCompanyId, data.data.expressNum, data.data.id,data.data.userId);
		},
		error: function(code, msg) {
			layer.msg(msg);
		},
		timeout: function() {}
	});

	//发货
	$scope.fahuo = function() {
		fahuo(cpjAjax, $scope, $routeParams.subOrderId, $location);
	}
});

/*
 * 发货
 */
function fahuo(cpjAjax, $scope, subOrderId, $location) {
	$scope.submited = false;
	$scope.kuaidi = ''; //快递id
	var form = layui.form();
	layer.open({
		type: 1,
		skin: 'layui-layer-demo',
		title: '编辑物流',
		closeBtn: '2',
		area: ['420px', '350px'], //宽高
		contentUrl: './subPage/form.html',
		btn: ['确定', '取消'],
		shadeClose: true,
		scope: $scope,
		yes: function(index, layero) {
			if($scope.kuaidi == 8 || $scope.kuaidi == '8') {
				deliverGoods(cpjAjax, $scope.kuaidi, $scope.danhao, $scope.merchantId,$scope.mytext,subOrderId,index,$location,$scope);
			}else {
				$scope.$apply(function() {
					$scope.submited = true;
				});
			}
			if($scope.myForm.$valid) {
				deliverGoods(cpjAjax, $scope.kuaidi, $scope.danhao, $scope.merchantId,'',subOrderId,index,$location,$scope);
			} else {
				$scope.$apply(function() {
					$scope.submited = true;
				});
			}
		},
		btn2: function(index, layero) {},
		cancel: function() {},
		success: function(layero, index) {
			setTimeout(function() {
				form.render('select');
				form.on('select(kuaidi)', function(data) {
					//					console.log(data);
					$scope.kuaidi = data.value;
					$scope.$apply(function() {
						$scope.myForm.kuaidi.$invalid = false;
					});
				});
				$scope.mytext = document.getElementById("mybeizhu").value;
			}, 100);
		},
		end: function() {
			$scope.danhao = "";
		}
	});
	wuLiu(cpjAjax, $scope);
}

/*
 * 获取所有快递
 */
function wuLiu(cpjAjax, $scope) {
	cpjAjax.ajax({
		url: '/express/list.json',
		method: "POST",
		headers: {
			"authorization": "Mw5Aag5Xcta9H2JIxhUmxzpiYkP9ku6aw084AcaSOoBQNvfA69+BDVgRXCc=",
			"user-agents": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36ZHUMENGYUNWEBBROKERPC"
		},
		data: {},
		success: function(data) {
			$scope.wulist = data.datas;
		},
		error: function(code, msg) {
			layer.msg(msg);
		},
		timeout: function() {}
	});
}
/*
 * 获取物流信息
 * expressCompanyId 快递公司id
 * expressNum 快递单号
 * subOrderId 子订单ID
 * userId 选填
 */
function getWuliuInfo($scope, cpjAjax, expressCompanyId, expressNum, subOrderId,myuserid) {
	cpjAjax.ajax({
		url: '/order/getSubOrderExpressInfo.json',
		method: "POST",
		data: {
			expressCompanyId: expressCompanyId,
			expressNum: expressNum,
			subOrderId: subOrderId,
			userId:myuserid
		},
		success: function(data) {
			$scope.wuliuInfo = data.data;
			if(data.data.isOwnExpress == 0 || data.data.isOwnExpress == '0') {
				if(data.data.traces.length == 0) {
					$scope.zwsj = false;
					$scope.zwsjts = true;
				} else {
					$scope.zwsj = true;
					$scope.zwsjts = false;
				}
				$scope.zwbz = false;
			} else if(data.data.isOwnExpress == 1 || data.data.isOwnExpress == '1') {
				$scope.zwbz = true;
				$scope.zwsj = false;
				$scope.zwsjts = false;
				$scope.beizhu = data.data.expressRemark;
				if(data.data.expressRemark == "" ||data.data.expressRemark == undefined){
					$scope.zwbzts = true;
				}else{
					$scope.zwbzts = false;
				}
			}
		},
		error: function(code, msg) {
			layer.msg(msg);
		},
		timeout: function() {}
	});
}

//function getWuliuInfo($scope, cpjAjax, expressCompanyId, expressNum) {//以前的调用
//	cpjAjax.ajax({
//		url: '/order/getExpressInfo.json',
//		method: "POST",
//		data: {
//			expressCompanyId: expressCompanyId,
//			expressNum: expressNum,
//			userId: ''
//		},
//		success: function(data) {
//			$scope.wuliuInfo = data.data;
//			if(data.data.traces.length == 0) {
//				$scope.zwsj = false;
//			} else {
//				$scope.zwsj = true;
//			}
//		},
//		error: function(code, msg) {
//			layer.msg(msg);
//		},
//		timeout: function() {}
//	});
//}
/*
 * 发货
 * expressCompanyId 快递公司id
 * expressNum 快递单号
 * expressRemark 备注
 * merchantId 商家Id
 * subOrderId 子订单号
 */
function deliverGoods(cpjAjax,expressCompanyId, expressNum, merchantId,expressRemark,subOrderId,index,$location,$scope) {
	cpjAjax.ajax({
		url: '/merchantOrder/consign.json',
		method: "POST",
		headers: {
			"authorization": "Mw5Aag5Xcta9H2JIxhUmxzpiYkP9ku6aw084AcaSOoBQNvfA69+BDVgRXCc=",
			"user-agents": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36ZHUMENGYUNWEBBROKERPC"
		},
		data: {
			expressCompanyId: expressCompanyId,
			expressNum: expressNum,
			merchantId: merchantId,
			expressRemark:expressRemark,
			subOrderId: subOrderId
		},
		success: function(data) {
			layer.msg("发货成功");
			layer.close(index);
			$location.path('/unfilledOrdersCtrl/1');
			$scope.getLists(1, $scope.order);
		},
		error: function(code, msg) {
			layer.msg(msg);
		},
		timeout: function() {}
	});
}