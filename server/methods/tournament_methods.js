Meteor.methods({
	// erstellt ein neues Turnier
	'createTournament': function(name){
		// check ob User eingeloggt
		if(Meteor.userId()){
			// Werte checken
			check(name, String);
			var data = {
				name: name,
				date: new Date(),
				participants: []
			}
			return Tournaments.insert(data);
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
	// trägt einen Roboter in das angegebene Turnier ein
	'signUpRobot': function(tournamentId, robotId){
		// check ob User eingeloggt
		if(Meteor.userId()){
			// eintragen
			return Tournaments.update({_id: tournamentId}, {$push: {participants: robotId}});
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
	// trägt einen Roboter aus einem angegebenen Turnier aus
	'signOutRobot': function(tournamentId, robotId){
		// check ob User eingeloggt
		if(Meteor.userId()){
			// austragen
			return Tournaments.update({_id: tournamentId}, {$pull: {participants: robotId}});
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	}
});