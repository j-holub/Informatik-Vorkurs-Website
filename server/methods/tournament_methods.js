Meteor.methods({
	// erstellt ein neues Turnier
	'createTournament': function(name, date){
		// check ob User eingeloggt
		if(Meteor.userId()){
			// schauen, dass das Datum in der Zukunft liegt
			if(date >= new Date()){
				// Werte checken
				check(name, String);
				check(date, Date);
				console.log(date);
				var data = {
					name: name,
					date: date,
					participants: []
				}
				return Tournaments.insert(data);
			}
			// Fehler werfen
			else{
				throw new Meteor.Error("Zeitreise", "Das Datum liegt in der Vergangenheit");
			}
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
	// löscht ein Turnier
	'deleteTournament': function(id){
		return Tournaments.remove(id);
	},
	// trägt einen Roboter in das angegebene Turnier ein
	'signUpForTournament': function(tournamentId, robotId){
		// Turnier suchen
		var tournament = Tournaments.findOne({_id: tournamentId})
		// check ob User eingeloggt
		if(Meteor.userId()){
			// get the users Group
			var usergroup = Groups.findOne({'members': Meteor.userId()});
			// überprüfen ob der User Mitglied dieser Gruppe ist
			if(usergroup){
				// checken ob das turnier noch läuft
				if(tournament.date >= new Date()){
					// checken ob die Gruppe noch nicht zu diesem Turnier angemeldet ist
					if(Tournaments.find({_id: tournamentId, 'participants.group': usergroup._id}).count() == 0){
						return Tournaments.update({
							_id: tournamentId
						}, {
							// JSON object mit GroupId und RobotId
							$push: {participants: {
								group: usergroup._id,
								robot: robotId
							}}
						});
					}
					else{
						throw new Meteor.Error("Overflow", "Deine Gruppe hat bereits einen Roboter in diesem Turnier");
					}
				}
				// fehler werfen
				else{
					throw new Meteor.Error("Zeitreise", "Das Turnier ist bereits beendet");
				}
			}
			// ansonsten Fehler werfen
			else{
				throw new Meteor.Error("Keine Berechtigung", "Du hast leider keine Gruppe");
			}
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
	// trägt einen Roboter aus einem angegebenen Turnier aus
	'signOutFromTournament': function(tournamentId, groupId){
		// check ob User eingeloggt
		if(Meteor.userId()){
			// überprüfen ob der User zur Gruppe gehört
			if(_.contains(Groups.findOne(groupId).members, Meteor.userId())){
				// checken ob das turnier noch läuft
				if(Tournaments.findOne({_id: tournamentId}).date >= new Date()){
					// austragen
					return Tournaments.update({_id: tournamentId}, {$pull: {participants: groupId}});
				}
				// fehler werfen
				else{
					throw new Meteor.Error("Zeitreise", "Das Turnier ist bereits beendet");
				}
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