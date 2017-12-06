"use strict";

app.controller("NewCtrl", function($location, $rootScope, $scope, PhotoService) {

	$scope.createNewPhoto = (photo) => {
				// photo.Favorite = false;
                let newPhoto = PhotoService.createImageDetails(photo, $rootScope.uid);
                PhotoService.postNewPhoto(newPhoto).then((results)=> {
                	console.log("results in CreatNewPhoto", results);
                    $location.path('/photoview');
                }).catch((err)=> {
                    console.log("err in createNewContact", err);
                });
        };


});