"use strict";

app.controller("AllphotoCtrl", function($location, $rootScope, $scope, PhotoService) {

const getAllUserPhotos = (photos) => {
	PhotoService.allPhotos(photos).then((results) => {
		console.log("results", results);
            $scope.userPhotos = results;
        }).catch((error) => {
            console.log("Error in getAllUserPhotos", error);
        });
    };


 getAllUserPhotos();

 // $scope.removeFromFavorites = () => {
 //    PhotoService.deletePhoto().then((result) =>{
 //      getAllUserPhotos();
 //    }).catch((err) =>{
 //      console.log("error in deletePhoto", err);
 //    });
 //  };

$scope.photoDetail = (id) => {
    $location.path(`/detail/${id}`);
  };

});