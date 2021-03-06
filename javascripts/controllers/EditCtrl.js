"use strict";

app.controller("EditCtrl", function($location, $rootScope, $scope, PhotoService, $routeParams) {

const getPhoto = () => {
        PhotoService.getSinglePhoto($routeParams.photoId).then((results) => {
            $scope.newPhoto = results.data;
        }).catch((err) => {
            console.log("getSingleContact", err);
        });
    };
    getPhoto();


			$scope.createNewPhoto = (photo) => {
                let newPhoto = PhotoService.createImageDetails(photo, $rootScope.uid);
                PhotoService.editPhoto(newPhoto, $routeParams.photoId).then((results)=> {
                    $location.path(`/detail/${$routeParams.photoId}`);
                }).catch((err)=> {
                    console.log("err in updatePhoto", err);
                });
        };

        

});