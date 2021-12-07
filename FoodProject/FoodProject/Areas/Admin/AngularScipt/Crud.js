
app.controller('SanPhamCtrl', ['$scope', 'CrudService',
    function ($scope, CrudService) {
        // Base Url   
        var baseUrl = 'http://localhost:65476/Admin/SanPham/';
        $scope.btnText = "Save";
        $scope.maphong = 0;
        $scope.Load = function () {
            var apiRoute = baseUrl + 'GetSP';
            var Sp = CrudService.getAll(apiRoute);
            Sp.then(function (response) {
                $scope.product = response.data.data;
            },
                function (error) {
                    console.log("Error: " + error);
             });
        },

        $scope.Clear = function () {
            $scope.Loaisp_id = " ";
            $scope.sanpham_id = " ";
            $scope.gia = " ";
            $scope.Nhacungcap_id = " ";
            $scope.Soluong = " ";
            $scope.picture = " ";
        }



            $scope.GetStudentByID = function (dataModel) {
                //debugger
                var apiRoute = baseUrl + 'Getdataid';
                var student = CrudService.getbyID(apiRoute, dataModel.student_id);
                student.then(function (response) {
                    $scope.student_id = response.data.data.student_id;
                    $scope.student_name = response.data.data.student_name;
                    $scope.student_email = response.data.data.student_email;
                    var value = response.data.data.student_email;

                    $("#cke_1_email").html(value);
                    $scope.canbo_id = response.data.data.canbo_id;
                    $scope.btnText = "Update";
                },
                    function (error) {
                        console.log("Error: " + error);
                    });
        }
        $scope.Loadcategori = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:65476/Categorii/Getcategori',
            }).then(function (response) {
                $scope.listLoaiSP = response.data;
                console.log(response)
            });
        };
        $scope.XoaSP = function (item) {
            $http({
                method: 'POST',
                url: 'http://localhost:65476/SanPham/DeleteSP',
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
    }


]);
