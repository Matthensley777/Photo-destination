"use strict";

app.service("PhotoService", function($http, $q, FIREBASE_CONFIG) {

    const getMyPhotos = (userId) => {
        let myPhotos = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/photos.json?orderBy="uId"&equalTo="${userId}"`).then((results) => {
                let photos = results.data;
                Object.keys(photos).forEach((key) => {
                    photos[key].id = key;
                    myPhotos.push(photos[key]);
                });
                resolve(myPhotos);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const allPhotos = () => {
    	let userPhotos = [];
    	return $q((resolve, reject) => {
          $http.get(`${FIREBASE_CONFIG.databaseURL}/photos.json`).then((result) => {
         	console.log("allPhotos in service", result.data);
         	let allUserPhotos = result.data;
         	Object.keys(allUserPhotos).forEach((key) => {
         		allUserPhotos[key].id = key;
         	userPhotos.push(allUserPhotos[key]);
         	});
            resolve(userPhotos);
         }).catch((err) => {
         	console.log("error in allPhotos", err);
         });
     });
    };

    const postNewPhoto = (newPhoto) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/photos.json`, JSON.stringify(newPhoto));
    };


    const createImageDetails = (photo, uId) => {
        return {
            "name": photo.name,
            "img_path": photo.img_path,
            "details": photo.details,
            "city": photo.city,
            "uId": uId
        };
    };

    const deletePhoto = (id) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/photos/${id}.json`);
    };

    const getSinglePhoto = (photoId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/photos/${photoId}.json`);
    };


    const editPhoto = (photo, Id) => {
        return $http.put(`${FIREBASE_CONFIG.databaseURL}/photos/${Id}.json`, JSON.stringify(photo));
    };

    // const removeUserPhotoFromFavorites = (photo) => {
    // 	return $http.placeholder(`${FIREBASE_CONFIG.databaseURL}/photos/${photo}.json`, JSON.stringify(photo));
    // };





    return {
        getMyPhotos,
        createImageDetails,
        postNewPhoto,
        deletePhoto,
        getSinglePhoto,
        editPhoto,
        allPhotos
    };

});