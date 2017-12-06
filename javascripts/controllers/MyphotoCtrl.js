"use strict";

app.controller("MyphotoCtrl", function($location, $rootScope, $scope, PhotoService) {

const getUserPhotos = () => {
        PhotoService.getMyPhotos($rootScope.uid).then((results) => {
            $scope.photos = results;
        }).catch((error) => {
            console.log("Error in getMyPhotos", error);
        });
    };

getUserPhotos();
	});