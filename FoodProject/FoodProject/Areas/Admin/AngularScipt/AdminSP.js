

app.controller('SanPhamCtrl', ['$scope', 'CrudService',
        function ($scope, CrudService,$http,$window) {
            // Base Url   
            var baseUrl = '/Admin/SanPham/';
            $scope.btntxt = "Save";
            $scope.Item;
            $scope.LoadLoaiSP = function () {
                var apiRoute = baseUrl + 'GetSP';
                var categori = CrudService.getAll(apiRoute);
                categori.then(function (response) {
                    $scope.listLoaiSP = response.data;
                },
                    function (error) {
                        console.log("Error: " + error);
                    })
            };

            $scope.LoadLoaiSP();
            $scope.Clear = function () {
                $scope.Loaisp_id = " ";
                $scope.sanpham_id = " ";
                $scope.sanpham_name = " ";
                $scope.Nhacungcap_id = " ";
                $scope.Soluong = " ";
                $scope.picture = " ";
            },





     
            $scope.DeletteSP = function (item) {
                if (!confirm("Bạn có muốn xóa loại sản phẩm: " + item.sanpham_name + " không?")) {
                    return;
                }
                var apiRoute = baseUrl + 'DeleteSP/';
                var deleLSP = CrudService.getbyID(apiRoute, item.sanpham_id);
                deleLSP.then(function (response) {
                    if (response.data != "") {
                        alert("Data Delete Successfully");
                        $scope.LoadLoaiSP();
                        $scope.Clear();
                    } else {
                        alert("Some error");
                    }
                }, function (error) {
                    console.log("Error: " + error);
                })
            },
                $scope.GetSPID = function (dataModel) {
                    //debugger
                    var apiRoute = baseUrl + 'GetSPID';
                    var lsp = CrudService.getbyID(apiRoute, dataModel.sanpham_id);
                    lsp.then(function (response) {
                        $scope.Loaisp_id = response.data.data.Loaisp_id;
                        $scope.sanpham_id = response.data.data.sanpham_id;
                        $scope.sanpham_name = response.data.data.sanpham_name;
                        $scope.gia = response.data.data.gia;
                        $scope.Nhacungcap_id = response.data.data.Nhacungcap_id;
                        $scope.Soluong = response.data.data.Soluong;
                        $scope.picture = response.data.data.picture;
                        $scope.btntxt = "Update";
                    },
                        function (error) {
                            console.log("Error: " + error);
                        });
                },
               
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
                                        alert('Có lỗi');

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
                                if (response.data.ok == 1) {
                                    alert('Thêm thành công');
                                    location.reload();
                                }
                                else {
                                    alert('Có lỗi');


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
        }]);

            


