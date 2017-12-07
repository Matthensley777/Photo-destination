"use strict";

app.controller("DetailCtrl", function($location, $rootScope, $scope, $routeParams, PhotoService) {

$scope.photo = {};

const getPhotoDetails = () => {
        PhotoService.getSinglePhoto($routeParams.photoId).then((results) => {
            $scope.photo = results.data;

        }).catch((err) => {
            console.log("getPhotoDetails", err);
        });
    };
    

$scope.deletePhoto = () => {
    PhotoService.deletePhoto($routeParams.photoId).then((results) =>{
    	$location.path(`/photoview`);
    }).catch((err) =>{
      console.log("error in deletePhoto", err);
    });
  };


getPhotoDetails();

$scope.editPhoto = (photo) => {
        let editPhotos = PhotoService.editPhoto(photo);
        PhotoService.editPhoto(editPhotos, photo, photo.id).then((results) => {
        }).catch((err) => {
            console.log("updateContact", err);
        });
    };

$scope.editDetail = (photoId) => {
    $location.path(`/edit/${$routeParams.photoId}`);
  };
});