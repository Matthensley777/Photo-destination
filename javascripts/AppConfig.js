"use strict";

// app.controller("testMap", function($scope) {
// 	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
// });

// app.config(function(uiGmapGoogleMapApiProvider, GOOGLE_CONFIG, $scope) {
//     uiGmapGoogleMapApiProvider.configure({
//            key: GOOGLE_CONFIG,
//         v: '3.20', //defaults to latest 3.X anyhow
//         libraries: 'weather,geometry,visualization'
//     });

//  $scope.googleMapsAPIKey = GOOGLE_CONFIG;

// });


let isAuth = (AuthService) => new Promise ((resolve, reject) => {
  if(AuthService.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthService){
  firebase.initializeApp(FIREBASE_CONFIG);


	

  //watch method that fires on change of a route.  3 inputs. 
  //event is a change event
  //currRoute is information about your current route
  //prevRoute is information about the route you came from
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
    // checks to see if there is a current user
    var logged = AuthService.isAuthenticated();

    var appTo;

    // to keep error from being thrown on page refresh
    if (currRoute.originalPath) {
      // check if the user is going to the auth page = currRoute.originalPath
      // if user is on auth page then appTo is true
      // if it finds something other than /auth it return a -1 and -1!==-1 so resolves to false
      // appTo = currRoute.originalPath.indexOf('/login') !== -1;
      appTo = currRoute.originalPath.indexOf('/login') !== -1;
    }

    //if not on /auth page AND not logged in redirect to /auth
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/login');
    }
  });
});


app.config(function($routeProvider){
  $routeProvider
    .when("/login", {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    })
    .when("/edit/:photoId", {
      templateUrl: 'partials/new.html',
      controller: 'EditCtrl',
      resolve: {isAuth}
    })
    .when("/detail/:photoId", {
      templateUrl: 'partials/detail.html',
      controller: 'DetailCtrl',
      resolve: {isAuth}
    })
    .when("/detailpublic/:photoId", {
      templateUrl: 'partials/detailpublic.html',
      controller: 'DetailCtrl',
      resolve: {isAuth}
    })
    .when("/photo", {
      templateUrl: 'partials/allphotoview.html',
      controller: 'AllphotoCtrl',
      resolve: {isAuth}
    })
    .when("/photoview", {
      templateUrl: 'partials/photoview.html',
      controller: 'MyphotoCtrl',
      resolve: {isAuth}
    })
    .when("/new", {
      templateUrl: 'partials/new.html',
      controller: 'NewCtrl',
      resolve: {isAuth}
    })
    .when("/favs", {
      templateUrl: 'partials/favs.html',
      controller: 'FavsCtrl',
      resolve: {isAuth}
    })
    .when("navbar", {
      templateUrl: 'partials/navbar.html',
      controller: 'NavCtrl',
      resolve: {isAuth}
    })
    .otherwise('/login');
});

// });



