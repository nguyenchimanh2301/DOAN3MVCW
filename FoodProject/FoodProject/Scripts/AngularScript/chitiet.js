///////////////////////////



app.controller("DetailCtrl", function ($scope, $http) {
    /*================== Danh sách các biến =================================== */
    /*=================== Thao tác dữ liệu ==================================== */
    $scope.product = {};
    $scope.chitiet = function (masp) {
        $http({
            method: 'GET',
            url: 'http://localhost:65476/Detail/GetchitietSP/?MaSP=' + masp,
        }).then(function (response) {
            console.log(response.data);
            $scope.product = response.data;
         }); 
    },

    $scope.addToCart = function (sp) {
        let item = {};
        item.sanpham_id = sp.sanpham_id;
        item.sanpham_name = sp.sanpham_name;
        item.picture = sp.picture;
        item.gia = sp.gia;
        item.quantity = 1;
        var list;
        if (localStorage.getItem('cart') == null) {
            list = [item];
        } else {
            list = JSON.parse(localStorage.getItem('cart')) || [];
            let ok = true;
            for (let x of list) {
                if (x.sanpham_id == item.sanpham_id) {
                    x.quantity += 1;
                    ok = false;
                    break;
                }
            }
            if (ok) {
                list.push(item);
            }
        }
        localStorage.setItem('cart', JSON.stringify(list));
        alert("Đã thêm giở hàng thành công");
    };
  
});