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
        let favoritePhoto = {uId:$rootScope.uid, photoId:photoId};
        PhotoService.postNewFavorite(favoritePhoto).then(() => {
            getAllUserPhotos();
            $location.path(`/favs/`);
        }).catch((err) => {
            console.log("error in addFavorite", err);
        });

    };

    $scope.photoDetail = (photoId) => {
        console.log("photoId", photoId);
        $location.path(`/detailpublic/${photoId}`);
    };



});