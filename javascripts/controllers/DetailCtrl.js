"use strict";

app.controller("DetailCtrl", function($location, $rootScope, $scope, $routeParams, PhotoService) {

$scope.photo = {};

const getPhotoDetails = () => {
        PhotoService.getSinglePhoto($routeParams.photoId).then((results) => {
        	console.log("getPhotoDetails", results.data);
            $scope.photo = results.data;
        }).catch((err) => {
            console.log("getPhotoDetails", err);
        });
    };
    

$scope.deletePhoto = (Id) => {
    PhotoService.deletePhoto(Id).then((result) =>{
     PhotoService.getMyPhotos();
    }).catch((err) =>{
      console.log("error in deletePhoto", err);
    });
  };


getPhotoDetails();
});