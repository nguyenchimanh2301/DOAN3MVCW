


app.controller("CustomerCtrl",['$scope', 'CrudService',function ($scope, $http, $window) {
    
    $scope.LoadKh = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:65476/Customer/GetCus',
        }).then(function (response) {
            $scope.listLoaiSP = response.data;
            console.log(response)
        });
    };
    $scope.XoaKh = function (item) {
    
        $http({
            method: 'POST',
            url: 'http://localhost:65476/Customer/DeleteSP',
            datatype: 'json',
            data: JSON.stringify(item)

        }).then(function (response) {
            if (response.data == 1) {
                alert('Xóa thành công');
                location.reload();
            }
            else {
                alert('Có lỗi');
            }
        });
    };


}]);


