Meteor.methods({
	// Fügt das Bildobjekt als ID Referenz dem Userprofil hinzu
	'addProfilePicture': function(imageId){
		if(Meteor.userId()){
			return Meteor.users.update(Meteor.userId(), {$set: {'profile.profilePicData': imageId}});
		}
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	}
})