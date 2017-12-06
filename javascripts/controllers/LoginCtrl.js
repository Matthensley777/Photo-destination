"use strict";


//googleAuth
app.controller("LoginCtrl", function($location, $rootScope, $scope, AuthService){
  $scope.login = "LoginCtrl";
    $scope.authenticate = () => {
    AuthService.authenticateGoogle().then((result) =>{
      $rootScope.uid = result.user.uid;
      $scope.$apply(() =>{
        $location.url("/photoview");
      });
    }).catch((err) =>{
      console.log("error in authenticateGoogle", err);
    });
  };
});