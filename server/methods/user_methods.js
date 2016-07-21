Meteor.methods({
	// Fügt das Bildobjekt als ID Referenz dem Userprofil hinzu
	'addProfilePicture': function(imageId){
		if(Meteor.userId()){
			// Altes Profilbild löschen
			var oldPicId = Meteor.user().profile.profilePicData;
			ProfilePics.remove({_id: oldPicId});
			return Meteor.users.update(Meteor.userId(), {$set: {'profile.profilePicData': imageId}});
		}
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
	// Löscht das Profilbild eines Users
	'deleteProfilePicture': function(){
		if(Meteor.userId()){
			ProfilePics.remove({_id: Meteor.user().profile.profilePicData});
			Meteor.users.update(Meteor.userId(), {$set: {'profile.profilePicData': null}});
		}
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
	'registerUser': function(userData){
		var userId = Accounts.createUser(userData);
		Roles.addUsersToRoles(userId, ['user']);
		return userId;	
	}
})