////////////////////////////


app.controller("CartCtrl", function ($scope, $http, $window) {
    $scope.listSP = [];
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.LoadCart = function () {
        $scope.listSP = JSON.parse(localStorage.getItem('cart'));
    };
    $scope.LoadCart();



    $scope.remove = function (item) {
        var index = $scope.listSP.indexOf(item);
        $scope.listSP.splice(index, 1);

        localStorage.setItem('cart', JSON.stringify($scope.listSP));
       
    },
    $scope.Tang = function (item) {
        var index = $scope.listSP.indexOf(item);
        if (index >= 0) {
            $scope.listSP[index].quantity += 1;
        }
        localStorage.setItem('cart', JSON.stringify($scope.listSP));
    }

    $scope.Giam = function (item) {
        var index = $scope.listSP.indexOf(item);
        if (index >= 0 && $scope.listSP[index].quantity >= 2) {
            $scope.listSP[index].quantity -= 1;
        }
        localStorage.setItem('cart', JSON.stringify($scope.listSP));
    }
    $scope.removeSP = function () {
        localStorage.removeItem('cart')
    }


    $scope.reloadcart = function () {
        location.reload();
    }
});
 
 



