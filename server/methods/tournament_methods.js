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
			// überprüfen ob der Roboter überhaupt dem User gehört
			if(Meteor.userId() == Robots.findOne({_id: robotId}).belongsTo){
				// eintragen
				return Tournaments.update({_id: tournamentId}, {$push: {participants: robotId}});
			}
			// ansonsten Fehler werfen
			else{
				throw new Meteor.Error("Keine Berechtigung", "Du hast keine Berechtigung diesen Roboter an zu melden");
			}
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
			// überprüfen ob der Roboter überhaupt dem User gehört
			if(Meteor.userId() == Robots.findOne({_id: robotId}).belongsTo){
				// austragen
				return Tournaments.update({_id: tournamentId}, {$pull: {participants: robotId}});
			}
			else{
				throw new Meteor.Error("Keine Berechtigung", "Du hast keine Berechtigung diesen Roboter ab zu melden");
			}
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	}
});