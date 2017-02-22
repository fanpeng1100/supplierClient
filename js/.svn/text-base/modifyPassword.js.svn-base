indexHtml.controller('modifyPasswordCtrl', function($scope, $routeParams, $http, cpjAjax, layer) {
	$scope.breadCrumbs = [{
		name: "安全中心",
		url: "#/modifyPassword",
	}, {
		name: "修改密码",
		url: "javascript:;",
	}];
}).directive('modifybutton', ["cpjAjax", function(cpjAjax) {
	var bc = '<button class="layui-btn layui-btn-normal modifyButton" id="modifyButton">修改</button>';
	return {
		restrict: "E",
		template: bc,
		replace: true,
		link: function($scope, $element, $attr) {
			$element.bind('click', function() {
				var modifyThePasswordWindow = layer.open({
					title: "修改密码",
					type: 1,
					skin: 'layui-layer-mydome',
					area: ['400px', '375px'], //宽高
					content: exportCancel(),
					btn: ['确定', '取消'],
					shadeClose: true,
					closeBtn: 2,
					scope: $scope,
					yes: function(index, layero) {
						if($scope.myForm.$valid) {
							//提交表单	
							cpjAjax.ajax({
								url: '/merchant/modifyPwd.json',
								method: "POST",
								headers: {
									"authorization": "Mw5Aag5Xcta9H2JIxhUmxzpiYkP9ku6aw084AcaSOoBQNvfA69+BDVgRXCc=",
									"user-agents": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36ZHUMENGYUNWEBBROKERPC"
								},
								data: {
									merchantId: localStorage.getItem("scUserId"),
									newPassword: $scope.newpassword,
									oldPassword: $scope.oldpassword
								},
								success: function(data) {
									layer.msg("密码修改成功");
									localStorage.clear();
									window.location.href="login.html";
								},
								error: function(code, msg) {
									layer.msg(msg);
								}
							});
						} else {
							layer.msg("表单格式不正确");
						}
					},
					btn2: function(index, layero) {
						//按钮【按钮二】的回调
					},
					cancel: function() {
						//右上角关闭回调
					},
					success: function(index, layero) {
						//						console.log(layero,index);
					}
				});
			});
		}
	};
}]).directive('compare', function() {
	return {
		restrict: "AE",
		scope: {
			orgText: "=compare"
		},
		require: "ngModel",
		link: function(scope, element, attr, ngModelcon) {
			ngModelcon.$validators.compare = function(v) {
				return v == scope.orgText;
			}

			scope.$watch('orgText', function() {
				ngModelcon.$validate();
			});
		}
	}
});

function exportCancel() { //修改密码表单
	var str = "";
	str += '<form class="layui-form mysubmit" name="myForm">';
	str += '<div class="layui-form-item mpassword">';
	str += '<label class="layui-form-label">原密码</label>';
	str += '<div class="layui-input-inline">';
	str += '<input type="password" ng-model="oldpassword" ng-minlength="6" ng-class="{\'error\':myForm.oldpassword.$invalid && myForm.oldpassword.$dirty,\'ok\':myForm.oldpassword.$valid}" name="oldpassword" placeholder="请输入原密码"  autocomplete="new-password" class="layui-input" required="required" maxLength="16">';
	str += '<i></i>';
	str += '</div>';
	str += '</div>';
	str += '<p class="my_p">';
	str += '<span class="myfcerror" ng-show="myForm.oldpassword.$dirty && myForm.oldpassword.$invalid">';
	str += '<span ng-show="myForm.oldpassword.$error.required">请填写原密码</span>';
	str += '<span ng-show="myForm.oldpassword.$error.minlength">新密码最少为6位</span>';
	str += '</span>';
	str += '</p>';
	str += '<div class="layui-form-item mpassword">';
	str += '<label class="layui-form-label">新密码</label>';
	str += '<div class="layui-input-inline">';
	str += '<input type="password" ng-model="newpassword" ng-minlength="6" ng-class="{\'error\':myForm.newpassword.$invalid && myForm.newpassword.$dirty,\'ok\':myForm.newpassword.$valid}" name="newpassword" placeholder="请输入新密码"  autocomplete="new-password" class="layui-input" required maxLength="16">';
	str += '<i></i>';
	str += '</div>';
	str += '</div>';
	str += '<p class="my_p">';
	str += '<span class="myfcerror" ng-show="myForm.newpassword.$dirty && myForm.newpassword.$invalid">';
	str += '<span ng-show="myForm.newpassword.$error.required">请填写密码</span>';
	str += '<span ng-show="myForm.newpassword.$error.minlength">新密码最少为6位</span>';
	str += '</span>';
	str += '</p>';
	str += '<div class="layui-form-item mpassword">';
	str += '<label class="layui-form-label">确认密码</label>';
	str += '<div class="layui-input-inline">';
	str += '<input type="password" ng-model="confirmpassword" compare="newpassword" ng-class="{\'error\':myForm.confirmpassword.$invalid && myForm.confirmpassword.$dirty,\'ok\':myForm.confirmpassword.$valid}" name="confirmpassword" placeholder="请输入新密码"  autocomplete="new-password" class="layui-input" required maxLength="16">';
	str += '<i></i>';
	str += '</div>';
	str += '</div>';
	str += '<p class="my_p">';
	str += '<span class="myfcerror" ng-show="myForm.confirmpassword.$dirty && myForm.confirmpassword.$invalid">';
	str += '<span ng-show="myForm.confirmpassword.$error.compare">两次输入不一致</span>';
	str += '</span>';
	str += '</p>';
	str += '</form>';
	return str;
}