Avatar.setOptions({
	generateCss: false,
	fallbackType: 'default image',
	gravatarDefault: 'mm',
	imageSizes: {
		'large': 80,
		'profile': 250,
	},
	customImageProperty: function(){
		if(this.profile.profilePicData){
			var imageId = this.profile.profilePicData;
			// im Profil das volle Bild zurückgeben
			if(Router.current().route.getName() === "profile"){
				return ProfilePics.findOne(imageId).url({download: true});
			}
			// ansonsten den Thumbnail
			else{
				return ProfilePics.findOne(imageId).url({download: true, store: 'profilePicsThumbs'});
			}
		}
		else{
			return null;
		}
	},
});