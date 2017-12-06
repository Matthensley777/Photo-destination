"use strict";

app.controller("MyphotoCtrl", function($location, $rootScope, $scope, PhotoService) {

const getUserPhotos = () => {
	console.log("getUserPhotos", $rootScope.uid);
        PhotoService.getMyPhotos($rootScope.uid).then((results) => {
            $scope.photos = results;
        }).catch((error) => {
            console.log("Error in getMyPhotos", error);
        });
    };

getUserPhotos();
	});