
app.controller("SanPhamCtrl", function ($scope, $http, $window) {
    /*================== Danh sách các biến =================================== */
    $scope.listLoaiSP = [];
    $scope.Item;

    $scope.LoadLoaiSP = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:65476//SanPham/GetSP',
        }).then(function (response) {
            $scope.listLoaiSP = response.data;
        });
    };
    
    $scope.Xoa = function (item) {
        if (!confirm("Bạn có muốn xóa loại sản phẩm: " + item.sanpham_name + " không?")) {
            return;
        }
        $http({
            method: 'POST',
            url: 'http://localhost:65476//SanPham/DeleteSP',
            datatype: 'json',
            data: JSON.stringify(item)
        }).then(function (response) {
            if (response.data == 1) {
                alert('Xóa thành công');
                location.reload();
            }
            else {
                alert('Xóa thành công');
            }
        });
    };
    $scope.AddSanPham = function () {

        var sp = {
        }
        sp.Loaisp_id = $scope.Loaisp_id
        sp.Nhacungcap_id = $scope.Nhacungcap_id;
        sp.Soluong = $scope.Soluong;
        sp.sanpham_name = $scope.sanpham_name;
        sp.gia = $scope.gia;
        sp.sanpham_id = $scope.sanpham_id;
        var file = document.getElementById('file').files[0];

        if ($scope.btntxt = "Thêm mới") {

            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: formData,
                    url: 'http://localhost:65476/SanPham/Upload',
                }).then(function (res) {
                    sp.picture = res.data;
                    $http({
                        method: 'POST',
                        url: 'http://localhost:65476/SanPham/AddSanPham',
                        datatype: 'json',
                        data: JSON.stringify(sp)
                    }).then(function (response) {
                        if (response.data == 1) {
                            alert('Thêm thành công');
                            location.reload();
                        }
                        else {
                            alert('Thêm thành công');

                        }
                    });
                });
            } else {
                $http({
                    method: 'POST',
                    url: 'http://localhost:65476/SanPham/AddSanPham',
                    datatype: 'json',
                    data: JSON.stringify(sp)
                }).then(function (response) {
                    if (response.data.res == 1) {
                        alert('Thêm thành công');
                        location.reload();
                    }
                    else {
                        alert('có lỗi');


                    }
                });
            }
        } else {

            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: formData,
                    url: 'http://localhost:65476/SanPham/Upload',
                }).then(function (res) {
                    sp.picture = res.data;
                    $http({
                        method: 'POST',
                        url: 'http://localhost:65476/SanPham/UpdateSP',
                        datatype: 'json',
                        data: JSON.stringify(sp)
                    }).then(function (response) {
                        if (response.data == 1) {
                            alert('Cập nhật thành công');
                            location.reload();
                        }
                        else {
                            alert('Có lỗi');


                        }
                    });
                });
            } else {
                sp.picture = $scope.Item.picture;
                $http({
                    method: 'POST',
                    url: 'http://localhost:65476/SanPham/UpdateSP',
                    datatype: 'json',
                    data: JSON.stringify(sp)
                }).then(function (response) {
                    if (response.data == 1) {
                        alert('Cập nhật thành công');
                        location.reload();
                    }
                    else {
                        alert('Có lỗi');


                    }
                });
            }
        }

    };
    $scope.Sua = function (item) {
        $scope.Item = item;
        $('#TenSP').val(item.TenSP);
        $('#Gia').val(item.Gia);
        $scope.Loaisp_id = item.Loaisp_id;
        $scope.Nhacungcap_id = item.Nhacungcap_id;
        $scope.Soluong = item.Soluong;
        $scope.sanpham_name = item.sanpham_name;
        $scope.gia = item.gia;
    };


});














































