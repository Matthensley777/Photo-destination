"use strict";

app.controller("FavsCtrl", function($location, $rootScope, $scope, PhotoService, $routeParams) {


    const getFavoritePhotos = () => {
        PhotoService.getUserPhotoFavorites($rootScope.uid).then((results) => {
            $scope.photos = results;
        }).catch((error) => {
            console.log("Error in getUserPhotos", error);
        });
    };

    getFavoritePhotos();

    $scope.removeFromFavorites = (FavoriteId) => {
      console.log("FavoriteId", FavoriteId);
        PhotoService.removeUserPhotoFromFavorites(FavoriteId).then((result) => {
          console.log("removeFromFavorites", result);
          getFavoritePhotos();
            $location.path(`/favs/`);
        }).catch((err) => {
            console.log("error in removeUserPhotoFromFavorites", err);
        });
    };

});