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
			return ProfilePics.findOne(imageId).url({download: true});
		}
		else{
			return null;
		}
	},
});