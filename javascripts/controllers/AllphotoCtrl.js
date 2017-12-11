"use strict";

app.controller("AllphotoCtrl", function($location, $rootScope, $scope, PhotoService, $routeParams) {

    const getAllUserPhotos = (photos) => {
        PhotoService.allPhotos($routeParams.photoId).then((results) => {
            $scope.userPhotos = results;
        }).catch((error) => {
            console.log("Error in getAllUserPhotos", error);
        });
    };


    getAllUserPhotos();



    $scope.addFavorite = (photoId) => {
        let newPhoto = PhotoService.postNewFavorite(photoId, $rootScope.uId);
        PhotoService.getUserPhotoFavorites(newPhoto, $routeParams.photoId).then((results) => {
          console.log("addFavorite");
          $scope.userPhotos = results;
            getAllUserPhotos();
            $location.path(`/favs/`);
        }).catch((err) => {
            console.log("error in addFavorite", err);
        });

    };

    $scope.photoDetail = (id) => {
        $location.path(`/detail/${id}`);
    };



});