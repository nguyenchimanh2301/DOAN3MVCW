

var ap;
ap = angular.module('MenuApp', []);


ap.controller("MenuCtrl", function ($scope, $http) {
    /*================== Danh sách các biến =================================== */

    /*=================== Thao tác dữ liệu ==================================== */
    $scope.TenLSP = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:65476/Login/Menu',
        }).then(function (response) {
            $scope.listLoaiSP = response.data;
            console.log(response)
        });
    };


});