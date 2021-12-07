


app.controller('CustomerCtrl', ['$scope','CrudService',
    function ($scope, CrudService) {
        var baseUrl = '/Admin/Customer/';
        $.btnText = "Save";
       

        $scope.LoadKh = function () {
            var apiRoute = baseUrl + 'Getcus';
            var Custom = CrudService.getAll(apiRoute);
            Custom.then(function (response) {
                $scope.listLoaiSP = response.data;
            },
                function (error) {
                    console.log("Error: " + error);
                });

        };
      

        $scope.Deletekh = function (dataModel) {
            if (!confirm("Bạn có muốn xóa hoc sinh: " + dataModel.Khachhang_id + " không?")) {
                return;
            }
            var apiRoute = baseUrl + 'DeleteKH';
            var Delkh = CrudService.getbyID(apiRoute, dataModel.Khachhang_id);
            Delkh.then(function (response) {
                if (response.data != "") {
                    alert("Data Delete Successfully");
                    $scope.LoadKh();
                } else {
                    alert("Some error");
                }
            }, function (error) {
                console.log("Error: " + error);
            })
        },
            $scope.GetSPID = function (dataModel) {
                //debugger
            var apiRoute = baseUrl + 'GetKHID';
               var lsp = CrudService.getbyID(apiRoute, dataModel.Khachhang_id);
                lsp.then(function (response) {
                    $scope.Khachhang_name = response.data.data.Khachhang_name;
                    $scope.Gioitinh = response.data.data.Gioitinh;
                    $scope.Ngaysinh = response.data.data.Ngaysinh;
                    $scope.Diachi = response.data.data.Diachi;
                    $scope.Sodt = response.data.data.Sodt;
                    $scope.Khachhang_id = response.data.data.Khachhang_id;
                  
                    $scope.btntxt = "Update";
                },
                    function (error) {
                        console.log("Error: " + error);
                    });
            },
            $scope.Savedt = function () {
                var st = {
                    Khachhang_id: $scope.Khachhang_id,
                    Gioitinh: $scope.Gioitinh,
                    Nhacungcap_id: $scope.Nhacungcap_id,
                    Ngaysinh: $scope.Ngaysinh,
                    Diachi: $scope.Diachi,
                    Sodt: $scope.Sodt,
                    Khachhang_name: $scope.Khachhang_name,
                }
                if ($scope.btntxt == "Save") {
                    var apiRoute = baseUrl + 'SaveLSP';
                    var save = CrudService.post(apiRoute, st);
                    save.then(function (response) {
                        if (response.data != "") {
                            alert("Data Save Successfully");
                            $scope.LoadKh();
                            $scope.Clear();

                        } else {
                            alert("Some error");
                        }
                    },
                        function (error) {
                            console.log("Error: " + error);
                        });
                }
                else {
                    var apiRoute = baseUrl + 'Update';
                    var UpdateSV = CrudService.post(apiRoute, st);
                    UpdateSV.then(function (response) {
                        if (response.data != "") {
                            alert("Data Update Successfully");
                            $scope.LoadKh();
                            $scope.Clear();

                        } else {
                            alert("Some error");
                        }
                    }, function (error) {
                        console.log("Error: " + error);

                    })
                }
            };





    }]);
