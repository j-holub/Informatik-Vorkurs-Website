// Alle user publishen
Meteor.publish('users', function(specificUserId){
	// Die User sollen nur für eingeloggte User sichtbar sein
	if(this.userId){
		// schauen ob eine userId spezifiziert wurde
		if(specificUserId){
			return [
				Meteor.users.find({_id: specificUserId}),
				// TODO nur benötigtes Profilbild publishen
				ProfilePics.files.find()
			]
		}
		// Ansonsten gib alle user aus
		else{
			return [
				Meteor.users.find(),
				ProfilePics.files.find()
			]
		}
	}
});

Meteor.publish(null, function(){
	if(currentUser){
		return ProfilePics.find();
	}
});