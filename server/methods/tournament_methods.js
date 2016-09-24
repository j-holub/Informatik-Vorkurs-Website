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
	'signUpForTournament': function(tournamentId, groupId){
		// Turnier suchen
		var tournament = Tournaments.findOne({_id: tournamentId})
		// check ob User eingeloggt
		if(Meteor.userId()){
			// überprüfen ob der User Mitglied dieser Gruppe ist
			if(_.contains(Groups.findOne(groupId).members, Meteor.userId())){
			// if($.inArray(Meteor.userId(), Groups.findOne(groupId).members) == 0){
				// checken ob das turnier noch läuft
				if(tournament.date >= new Date()){
					// checken ob die Gruppe bereits zum Turnier angemeldet ist
					if(tournament.participants.indexOf(groupId) == -1){
						// eintragen
						return Tournaments.update({_id: tournamentId}, {$push: {participants: groupId}});
					}
					// Fehler werfen
					else{
						throw new Meteor.Error("Overflow", "Du hast bereits einen Roboter im Turnier");
					}
				}
				// fehler werfen
				else{
					throw new Meteor.Error("Zeitreise", "Das Turnier ist bereits beendet");
				}
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
	'signOutFromTournament': function(tournamentId, groupId){
		// check ob User eingeloggt
		if(Meteor.userId()){
			// überprüfen ob der Roboter überhaupt dem User gehört
			if(_.contains(Groups.findOne(groupId).members, Meteor.userId())){
			// if(($.inArray(Meteor.userId(), Groups.findOne(groupId).members) == 0)){
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