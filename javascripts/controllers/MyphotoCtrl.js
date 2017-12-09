"use strict";

app.controller("MyphotoCtrl", function($location, $rootScope, $scope, PhotoService, $routeParams) {

const getUserPhotos = () => {
        PhotoService.getMyPhotos($rootScope.uid).then((results) => {
            $scope.photos = results;
        }).catch((error) => {
            console.log("Error in getUserPhotos", error);
        });
    };

getUserPhotos();

$scope.deletePhoto = (Id) => {
    PhotoService.deletePhoto(Id).then((result) =>{
      getUserPhotos();
    }).catch((err) =>{
      console.log("error in deletePhoto", err);
    });
  };

  $scope.photoDetail = (id) => {
    $location.path(`/detail/${id}`);
  };
$scope.editDetail = (Id) => {
    $location.path(`/edit/${Id}`);
  };

});