

app.controller('SanPhamCtrl', ['$scope', 'CrudService',
    function ($scope, CrudService, $http) {
        // Base Url   
        var baseUrl = '/Admin/Account/';
        $scope.btntxt = "Save";
        $scope.Item;
        $scope.Load = function () {
            var apiRoute = baseUrl + 'GetAcounts';
            var categori = CrudService.getAll(apiRoute);
            categori.then(function (response) {
                $scope.listac = response.data;
            },
                function (error) {
                    console.log("Error: " + error);
                })
        };

        $scope.Load();
        $scope.Clear = function () {
            $scope.Users_id = " ";
            $scope.Passwords = " ";
            $scope.email = " ";
        },
        $scope.GetuserID = function (item) {
            var apiRoute = baseUrl + 'GetID';
            var lsp = CrudService.getbyID(apiRoute, item.Users_id);
            lsp.then(function (response) {
                $scope.Users_id = response.data.data.Users_id;
                $scope.Passwords = response.data.data.Passwords;
                $scope.email = response.data.data.email;
                $scope.btntxt = "Update";
            },
                function (error) {
                    console.log("Error: " + error);
                });
        },

        $scope.Delete = function (item) {
            if (!confirm("Bạn có muốn xóa user : " + item.Users_id + " không?")) {
                return;
            }
            var apiRoute = baseUrl + 'DelAcounts/';
            var deleLSP = CrudService.getbyID(apiRoute, item.Users_id);
            deleLSP.then(function (response) {
                if (response.data != "") {
                    alert("Xoá thành công");
                    $scope.Load();
                    $scope.Clear();
                } else {
                    alert("Some error");
                }
            }, function (error) {
                console.log("Error: " + error);
            })
        },
            

            $scope.Savedt = function () {
                var st = {
                    Users_id: $scope.Users_id,
                    Passwords: $scope.Passwords,
                    email: $scope.email,
                     
                }
                if ($scope.btntxt == "Save") {
                    var apiRoute = baseUrl + 'AddAcounts';
                    var saveLSP = CrudService.post(apiRoute, st);
                    saveLSP.then(function (response) {
                        if (response.data != "") {
                            alert("Data Save Successfully");
                            $scope.Load();
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
                    var apiRoute = baseUrl + 'UpdateAcounts';
                    var UpdateSV = CrudService.post(apiRoute, st);
                    UpdateSV.then(function (response) {
                        if (response.data != "") {
                            alert("Data Update Successfully");
                            $scope.Load();
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




