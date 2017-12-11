"use strict";

app.controller("FavsCtrl", function($location, $rootScope, $scope, PhotoService) {


const getFavoritePhotos = () => {
        PhotoService.getUserPhotoFavorites($rootScope.uid).then((results) => {
        	console.log("getFavoritePhotos", results);
            $scope.photos = results;
        }).catch((error) => {
            console.log("Error in getUserPhotos", error);
        });
    };

getFavoritePhotos();

$scope.removeFromFavorites = () => {
    PhotoService.removeUserPhotoFromFavorites().then((result) =>{
      console.log("removeFromFavorites", result);
      getFavoritePhotos();
    }).catch((err) =>{
      console.log("error in removeUserPhotoFromFavorites", err);
    });
  };

});