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

    const getUserPhotoFavorites = (uId) => {
        let favoritePhotos = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/Favorites.json?orderBy="uId"&equalTo="${uId}"`).then((results) => {
                let photosAddedToFavorite = results.data;
                Object.keys(photosAddedToFavorite).forEach((favoriteId) => {
                	let photoObject = photosAddedToFavorite[favoriteId];
                	let photoId = photoObject.photoId;
                    $http.get(`${FIREBASE_CONFIG.databaseURL}/photos/${photoId}.json`).then((photoResults) => {
                    	if (photoResults.data) {
                    	photoObject.name = photoResults.data.name;
                    	photoObject.img_path = photoResults.data.img_path;
                    	photoObject.details = photoResults.data.details;
                    	photoObject.city = photoResults.data.city;
                    	photoObject.uId = photoResults.data.uId;
                    	photoObject.id = favoriteId;
                    }
                    	favoritePhotos.push(photoObject);
                        resolve(favoritePhotos);
                	}).catch((err) => {
                    	console.log("err1 in addUserPhotoToFavorites", err);
                	});
                });

            	}).catch((error) => {
                	console.log("error2 in addUserPhotoToFavorites", error);
            });
        });
    };

    const postNewPhoto = (newPhoto) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/photos.json`, JSON.stringify(newPhoto));
    };

	const postNewFavorite = (newPhoto) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/Favorites.json`, JSON.stringify(newPhoto));
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

    const removeUserPhotoFromFavorites = (FavoriteId) => {
    	return $http.delete(`${FIREBASE_CONFIG.databaseURL}/Favorites/${FavoriteId}.json`);
    };

    const removeUserFavoritePhotoByPhotoId = (photoId) => {
    	let photos = [];
    	return $q((resolve, reject) => {
    		$http.get(`${FIREBASE_CONFIG.databaseURL}/Favorites.json?orderBy="photoId"&equalTo="${photoId}"`).then((results)=> {
    			let favoritedPhotos = results.data;
    			Object.keys(favoritedPhotos).forEach((key) => {
    				$http.delete(`${FIREBASE_CONFIG.databaseURL}/Favorites/${key}.json`).then(()=> {

    				}).catch((err) => {
    					console.log("err1 removeUserFavoritePhotoByPhotoId", err);
    				});
   
    			});
    		}).catch((err) => {
    			console.log("err2 in removeUserFavoritePhotoByPhotoId", err);
    		});
    	});
    };



    return {
        getMyPhotos,
        createImageDetails,
        postNewPhoto,
        deletePhoto,
        getSinglePhoto,
        editPhoto,
        allPhotos,
        getUserPhotoFavorites,
        removeUserPhotoFromFavorites,
        postNewFavorite,
        removeUserFavoritePhotoByPhotoId
    };

});