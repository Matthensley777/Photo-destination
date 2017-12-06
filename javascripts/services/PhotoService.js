"use strict";

app.service("PhotoService", function ($http, $q, FIREBASE_CONFIG) {

const getMyPhotos = (userId) => {
		let myPhotos = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/photos.json?orderBy="uId"&equalTo="${userId}"`).then((results) => {
				console.log("getMyPhotos", results);
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

// const createImageDetails = (photo) => {
// 		return {
// 			"name": "photo.name",
//             "img_path": "photo.img_path",
//             "details": "photo.details",
//             "city": "photo.city",
//             "uId": "photo.uId"
// 		};
// 	};

	return {getMyPhotos};

	});