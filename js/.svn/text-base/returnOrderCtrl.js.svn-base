//退换货订单列表
indexHtml.controller('returnOrderCtrl', function($scope, $routeParams, $rootScope, cpjAjax, Daochu) {
		$scope.timeName = '申请时间';
		$scope.order = {}; //查询表单对象
		$scope.merchantId = localStorage.getItem("scUserId");
		$scope.orderStatus = $routeParams.orderType;
		if($routeParams.orderType == "7") {
			$scope.breadName = "退货订单";
			$scope.orderOneStatus = "7";
		} else if($routeParams.orderType == "11") {
			$scope.breadName = "换货订单";
			$scope.orderOneStatus = "11";
		}
		$scope.breadCrumbs = [{
			name: "退换货管理",
			url: "javascript:;",
		}, {
			name: $scope.breadName,
			url: "javascript:;",
		}];

		ReturnOrderList(cpjAjax, $scope, $routeParams.orderType, 1);
		//查询
		$scope.chaxun = function() {
				ReturnOrderList(cpjAjax, $scope, $routeParams.orderType, 1);
			}
			//刷新
		$scope.refresh = function() {
				ReturnOrderList(cpjAjax, $scope, $routeParams.orderType, 1);
			}
			//导出
		$scope.export = function() {
			if(this.ReturnOrderList.length!=0) {
				layer.open({
					title: "导出订单",
					content: "确定导出此条件下订单",
					skin: 'exportDialog',
					closeBtn: 2,
					btn: ["确定", "取消"],
					yes: function(index) {
						Daochu.daochu()
						layer.close(index);
					}
				});
			}else{
				layer.msg("无数据导出");
			}
		}
	})
	//退换货订单详情
	.controller("returnDetailsCtrl", function($scope, $routeParams, cpjAjax) {
		$scope.breadCrumbs = [{
			name: "退换货管理",
			url: "#/returnOrder/" + $routeParams.orderOneStatus,
		}, {
			name: decodeURI($routeParams.orderType),
			url: "#/returnOrder/" + $routeParams.orderOneStatus,
		}, {
			name: "订单处理",
			url: "javascript:;",
		}];
		//请求订单详情
		cpjAjax.ajax({
			url: "/merchantOrder/subOrderDetail.json",
			data: {
				merchantId: localStorage.getItem("scUserId"),
				subOrderId: $routeParams.orderId
			},
			success: function(data) {
				$scope.baseImageUrl = data.baseImageUrl;
				var subOrderNumArr = data.data.subOrderNum.split("");
				var newArr = [];
				for(var i = 0; i < subOrderNumArr.length; i++) {
					if(i == "3" || i == "7" || i == "11" || i == "15") {
						newArr.push(subOrderNumArr[i] + " ");
					} else {
						newArr.push(subOrderNumArr[i]);
					}
				}
				$scope.subOrderNum = newArr.join("");; //子订单号
				$scope.orderStatus = data.data.orderStatus; //订单状态
				getExpressList(cpjAjax, $scope); //获取物流公司列表
				$scope.canRecoveredGoods = data.data.canRecoveredGoods; //用于判断是否是退款中的确认收货
				$scope.orderStatusStr = data.data.orderStatusStr; //订单状态字符串
				$scope.nickname = data.data.nickname; //用户昵称
				$scope.userPhone = data.data.userPhone; //用户账号
				$scope.goodsNum = data.data.goodsNum; //商品编号
				$scope.goodsName = data.data.goodsName; //商品名称
				$scope.goodsPic = $scope.baseImageUrl + data.data.goodsPic; //商品图片
				$scope.goodsQuantity = data.data.goodsQuantity; //购买数量
				$scope.goodsPriceStr = data.data.goodsPriceStr; //商品单价
				$scope.message = data.data.message; //备注

				$scope.consigneeName = data.data.consigneeName; //收货人姓名
				$scope.mobilePhone = data.data.mobilePhone; //收货人电话
				$scope.detailAddress = data.data.detailAddress; //收货人地址
				$scope.totalPayStr = data.data.totalPayStr; //订单金额
				$scope.realPayStr = data.data.realPayStr; //实付金额
				$scope.favorableInfo = data.data.favorableInfo; //优惠方式
				$scope.favorableMoneyStr = data.data.favorableMoneyStr; //优惠金额
				$scope.discount = data.data.discount; //会员折扣
				$scope.discountMoneyStr = data.data.discountMoneyStr; //会员折扣金额
				switch(Number(data.data.payChannel)) { //支付方式
					case 1:
						$scope.payChannel = "支付宝";
						break;
					case 2:
						$scope.payChannel = '微信支付';
						break;
					default:
						$scope.payChannel = '未知';
						break;
				}
				$scope.payTimeStr = data.data.payTimeStr; //支付时间
				$scope.invoiceTitle = data.data.invoiceTitle; //发票抬头
				switch(Number(data.data.invoiceType)) { //发票类型
					case 1:
						$scope.invoiceType = "普通发票"
						break;
					case 2:
						$scope.invoiceType = '电子发票';
						break;
					case 3:
						$scope.invoiceType = '增值税发票';
						break;
					default:
						$scope.invoiceType = '未知';
						break;
				}
				$scope.invoiceContent = data.data.invoiceContent; //发票内容

				//物流
				$scope.deliverTimeStr = data.data.deliverTimeStr; //发货时间
				$scope.confirmTimeStr = data.data.confirmTimeStr; //确认收货时间
				$scope.expressNum = data.data.expressNum; //物流单号
				getExpressInfo(cpjAjax, $scope, data.data.expressCompanyId, data.data.expressNum);
			},
			error: function(code, msg) {
				layer.msg(msg);
			}
		});
		//退换货详情
		cpjAjax.ajax({
			url: "/merchantOrder/findRefundInfo.json",
			data: {
				merchantId: localStorage.getItem("scUserId"),
				subOrderId: $routeParams.orderId
			},
			success: function(data) {
				$scope.trendsList = data.data.trends;
				switch(data.data.verifyStatus) { //申请审核结果
					case 1:
						$scope.verifyStatus = "待审核";
						break;
					case 2:
						$scope.verifyStatus = "审核通过";
						break;
					case 3:
						$scope.verifyStatus = "审核驳回";
						break;
					default:
						$scope.verifyStatus = "未知";
						break;
				}
				if($routeParams.orderOneStatus == "7") { //退换货原因标题
					$scope.returnTitle = "退货原因"
				} else if($routeParams.orderOneStatus == "11") {
					$scope.returnTitle = "换货原因"
				}
				$scope.refundRemark = data.data.refundRemark; //退换货原因描述
				$scope.imgList = data.data.pics; //图片列表
				$scope.baseImgUrl = localStorage.getItem("baseImgUrl"); //图片基础路径

			},
			error: function(code, msg) {
				layer.msg(msg);
			}
		});
		//处理退换货申请
		$scope.handleRe = function(re) {
				if(this.remark != undefined && this.remark != "") {
					if($routeParams.orderOneStatus == "7") { //退货
						var url = "/merchantOrder/handleRefund.json";
					} else if($routeParams.orderOneStatus == "11") { //换货
						var url = "/merchantOrder/handleExchange.json";
					}

					handleRefundExchange(cpjAjax, $scope, $routeParams.orderId, url, re, $routeParams.orderOneStatus, this.remark);
				} else {
					layer.msg("请先填写处理意见");
				}

			}
			//换货中发货提交
		layui.form().on('submit(exSubmit)', function(data) {
			cpjAjax.ajax({
				url: "/merchantOrder/exchangeConsign.json",
				data: {
					expressCompanyId: data.field.expressList,
					expressNum: data.field.sendExpressNum,
					merchantId: localStorage.getItem("scUserId"),
					subOrderId: $routeParams.orderId
				},
				success: function(data) {
					layer.open({
						title: "换货发货",
						content: "已发货成功",
						yes: function(index) {
							window.location.href = '#/returnOrder/11';
							layer.close(index);
						}
					});
				},
				error: function(code, msg) {
					layer.msg(msg);
				}
			});
			return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
		});

		//商家对于退款中的订单进行确认收货
		$scope.sureReceipt = function() {
			cpjAjax.ajax({
				url: "/merchantOrder/handleRecoveredGoods.json",
				data: {
					merchantId: localStorage.getItem("scUserId"),
					subOrderId: $routeParams.orderId
				},
				success: function(data) {
					layer.open({
						title: "确认收货",
						content: "已成功确认收货",
						yes: function(index) {
							window.location.href = '#/returnOrder/7';
							layer.close(index);
						}
					});
				},
				error: function(code, msg) {
					layer.msg(msg);
				}
			})
		}
		layui.form().render('select');
	});

//退换货订单
function ReturnOrderList(cpjAjax, $scope, orderType, pageNum) {
	var pageSize = 10;
	cpjAjax.ajax({
		url: "/merchantOrder/list.json",
		data: {
			merchantId: localStorage.getItem("scUserId"),
			orderStatus: orderType,
			pageNum: pageNum,
			pageSize: pageSize,
			orderNum: $scope.order.orderNum,
			phone: $scope.order.phone,
			goodsName: $scope.order.goodsName,
			applyTimeStart: $scope.order.applyTimeStart,
			applyTimeEnd: $scope.order.applyTimeEnd,
		},
		success: function(data) {
			$scope.ReturnOrderList = data.data.list;
			$scope.pageNum = data.data.pageNum; //当前页 页号
			$scope.pageSize = pageSize; //当前 页容量
			layui.laypage({
				cont: "returnOrderPages",
				pages: data.data.pages,
				curr: pageNum,
				//				skin:"#c00",
				jump: function(obj, first) {
					if(!first) {
						ReturnOrderList(cpjAjax, $scope, orderType, obj.curr);
					}
				}
			});
		},
		error: function(code, msg) {
			layer.msg(msg);
		}
	})
}

function getExpressInfo(cpjAjax, $scope, ecId, exNum) {
	cpjAjax.ajax({
		url: "/order/getExpressInfo.json",
		data: {
			expressCompanyId: ecId,
			expressNum: exNum
		},
		success: function(data) {
			$scope.expressCompanyLogo = data.baseImageUrl + data.data.expressCompanyLogo; //物流公司logo
			$scope.expressCompanyName = data.data.name; //物流公司名称
			$scope.traces = data.data.traces; //物流动态信息
		},
		error: function(code, msg) {
			layer.msg(msg);
		}
	})
}

//获取物流公司列表
function getExpressList(cpjAjax, $scope) {
	cpjAjax.ajax({
		url: "/express/list.json",
		success: function(data) {
			var obj = {
				name: "请选择物流公司",
				id: ""
			}
			data.datas.unshift(obj);
			$scope.expressList = data.datas;
			setTimeout(function() {
				layui.form().render('select');
			}, 100);
		},
		error: function(code, msg) {
			layer.msg(msg);
		}
	});
}

//退换货处理
function handleRefundExchange(cpjAjax, $scope, orderId, url, verifyStatus, orderStatus, remark) {
	cpjAjax.ajax({
		url: url,
		data: {
			merchantId: localStorage.getItem("scUserId"),
			remark: remark,
			subOrderId: orderId,
			verifyStatus: verifyStatus
		},
		success: function(data) {
			layer.open({
				title: '退换货申请审批',
				content: '操作成功',
				closeBtn: 0,
				icon: 6,
				yes: function(index) {
					window.location.href = '#/returnOrder/' + orderStatus;
					layer.close(index);
				}

			});

		},
		error: function(code, msg) {
			layer.msg(msg);
		}
	});
}