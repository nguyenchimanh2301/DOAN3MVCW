





app.controller('SanPhamCtrl', ['$scope', 'CrudService',
    function ($scope, CrudService) {
        // Base Url   

        var baseUrl = '/Admin/Categorii/';


        $scope.btntxt = "Save";
        $scope.getct = function () {
            var apiRoute = baseUrl + 'GetCategori';
            var categori = CrudService.getAll(apiRoute);
            categori.then(function (response) {
                $scope.listLoaiSP = response.data;
            },
                function (error) {
                    console.log("Error: " + error);
                })
        };
        $scope.getct();
        $scope.Clear = function () {
            $scope.Loaisp_id = " ";
            $scope.Loaisp_name = " ";
            $scope.mota = " ";
        }


        $scope.Savedt = function () {
            var st = {
                Loaisp_id: $scope.Loaisp_id,
                Loaisp_name: $scope.Loaisp_name,
                mota: $scope.mota,
            }
            if ($scope.btntxt == "Save") {
                var apiRoute = baseUrl + 'SaveLSP';
                var saveLSP = CrudService.post(apiRoute, st);
                saveLSP.then(function (response) {
                    if (response.data != "") {
                        alert("Data Save Successfully");
                        $scope.getct();
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
                var apiRoute = baseUrl + 'UpdateLSP';
                var UpdateSV = CrudService.post(apiRoute, st);
                UpdateSV.then(function (response) {
                    if (response.data != "") {
                        alert("Data Update Successfully");
                        $scope.getct();
                        $scope.Clear();

                    } else {
                        alert("Some error");
                    }
                }, function (error) {
                    console.log("Error: " + error);

                })
            }
        }
        $scope.DeletteLSP = function (item) {
            if (!confirm("Bạn có muốn xóa loại sản phẩm: " + item.Loaisp_name + " không?")) {
                return;
            }
            var apiRoute = baseUrl + 'DeleteLSP/';
            var deleLSP = CrudService.getbyID(apiRoute, item.Loaisp_id);
            deleLSP.then(function (response) {
                if (response.data != "") {
                    alert("Data Delete Successfully");
                    $scope.getct();
                    $scope.Clear();
                } else {
                    alert("Some error");
                }
            }, function (error) {
                console.log("Error: " + error);
            })
        },
            $scope.GetLSPID = function (dataModel) {
                //debugger
                var apiRoute = baseUrl + 'GetLSPID';
                var lsp = CrudService.getbyID(apiRoute, dataModel.Loaisp_id);
                lsp.then(function (response) {
                    $scope.Loaisp_id = response.data.data.Loaisp_id;
                    $scope.Loaisp_name = response.data.data.Loaisp_name;
                    $scope.mota = response.data.data.mota;
                    $scope.btntxt = "Update";
                },
                    function (error) {
                        console.log("Error: " + error);
                    });
            },
             $scope.currentPage = 1;



  
  $scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
  };

  function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
}
           
}]);
