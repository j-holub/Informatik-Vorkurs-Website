Meteor.methods({
	'createGroup': function(name){
		// checkt ob der User eingeloggt is
		if(Meteor.userId()){
			// checken ob der User nicht schon in einer anderen Gruppe ist
			var groupCount = Groups.find({members: {$in: [Meteor.userId()]}}).count();
			if(groupCount == 0){
				// Eintrag erstellen
				var data = {
					'name': name,
					'creator': Meteor.userId(),
					'members': [Meteor.userId()]
				}
				return Groups.insert(data);
			}
			// Wenn der User schon in einer anderen Gruppe ist Fehler werfen
			else{
				throw new Meteor.Error("Schon in einer Gruppe", "Du bist bereits Mitglied einer Gruppe");
			}
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
	'deleteGroup': function(groupId){
		// checkt ob der User eingeloggt is
		if(Meteor.userId()){
			// checken ob der User auch der Gruppenersteller ist
			if(Groups.findOne(groupId).creator === Meteor.userId()){
				// Gruppe löschen
				return Groups.remove(groupId);
			}
			// wenn nicht, Fehler werfen
			else{
				throw new Meteor.Error("Nicht der Gruppenersteller", "Du bist nicht der Ersteller dieser Gruppe");
			}
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
	'addUserToGroup': function(groupId, userId){
		// checkt ob der User eingeloggt is
		if(Meteor.userId()){
			// checken ob der aktuelle User Gruppenersteller ist
			if(Groups.findOne(groupId).creator === Meteor.userId()){
				// checken ob der User nicht schon in einer anderen Gruppe ist
				var groupCount = Groups.find({members: {$in: [userId]}}).count();
				if(groupCount == 0){
					return Groups.update({_id: groupId}, {$push: {'members': userId}});
				}
				// wenn ein User schon in einer anderen Gruppe ist, Fehler werfen
				else{
					throw new Meteor.Error("User schon in einer Gruppe", "Der Nutzer ist bereits Mitglied einer Gruppe");
				}
			}
			// wenn der User nicht Gruppenersteller ist, Fehler werfen	
			else{
				throw new Meteor.Error("Du bist nicht der Ersteller dieser Gruppe", "Du bist nicht der Ersteller dieser Gruppe");
			}
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
	'removeUserFromGroup': function(groupId, userId){
		// checkt ob der User eingeloggt is
		if(Meteor.userId()){
			// checken ob der aktuelle User Gruppenersteller ist
			if(Groups.findOne(groupId).creator === Meteor.userId()){
				// checken ob der zu löschende Nutzer der Gruppenersteller ist
				if(!(Groups.findOne(groupId).creator === userId)){
					// User aus der Gruppe entfernen
					return Groups.update({_id: groupId}, {$pull: {'members': userId}});
				}
				// Wenn ja, Fehler werfen
				else{
					throw new Meteor.Error("Gruppenersteller löschen", "Der Gruppenersteller kann nicht entfernt werden");
				}
			}
			// wenn der User nicht Gruppenersteller ist, Fehler werfen	
			else{
				throw new Meteor.Error("Du bist nicht der Ersteller dieser Gruppe", "Du bist nicht der Ersteller dieser Gruppe");
			}
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
	'leaveGroup': function(groupId){
		// checkt ob der User eingeloggt is
		if(Meteor.userId()){
			// checken ob der User auch Gruppenmitglied ist
			if(_.indexOf(Groups.findOne(groupId).members, Meteor.userId()) != -1){
				Groups.update({_id: groupId}, {$pull: {'members': Meteor.userId()}});
				// sollte dies der letzte User in der Gruppe gewesen sein muss die Gruppe gelöscht werden
				if(Groups.findOne(groupId).members.length == 0) {
					Meteor.call('deleteGroup', groupId, function(result, error){
						if(error){
							console.log(error.message);
						}
						else{
							return true;
						}
					});
				}
				// wenn nicht, einen neuen Gruppenleiter aussuchen
				else{
					var newCreatorId = Groups.findOne(groupId).members[0];
					Groups.update({_id: groupId}, {$set: {'creator': newCreatorId}});
					return true;
				}
			}
			// wenn nicht, Fehler werfen
			else{
				throw new Meteor.Error("Kein Gruppenmitglied", "Du bist kein Mitglied dieser Gruppe");
			}
		}
	},
	'selectGroupRobot': function(groupId, robotId){
		// checkt ob der User eingeloggt is
		if(Meteor.userId()){
			// checken ob der User auch Gruppenmitglied ist
			if(_.indexOf(Groups.findOne(groupId).members, Meteor.userId()) != -1){
				// checken ob der Roboter auch zu einem der User gehört
				if(_.indexOf(Groups.findOne(groupId).members, Robots.findOne(robotId).belongsTo) != -1){
					return Groups.update({_id: groupId}, {$set: {'mainbot': robotId}});
				}
				else{
					throw new Meteor.Error("Kein Roboterzugriff", "Der Roboter gehört keinem Mitglied dieser Gruppe");
				}
			}
			// wenn nicht, Fehler werfen
			else{
				throw new Meteor.Error("Kein Gruppenmitglied", "Du bist kein Mitglied dieser Gruppe");
			}
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}

	},
	'clearGroupRobot': function(groupId){
		// checkt ob der User eingeloggt is
		if(Meteor.userId()){
			// checken ob der User auch Gruppenmitglied ist
			if(_.indexOf(Groups.findOne(groupId).members, Meteor.userId()) != -1){
				// die Gruppe aus allen Turnieren austragen in denen sie eingetragen ist
				var tournaments = Tournaments.find({participants: groupId});
				tournaments.forEach(function (tournament) {
					Meteor.call('signOutFromTournament', tournament._id, groupId, function(result, error) {
						if(error){
							console.log(error.reason);
						}
					})
				});
				return Groups.update({_id: groupId}, {$unset: {'mainbot': ""}});
			}
			// wenn nicht, Fehler werfen
			else{
				throw new Meteor.Error("Kein Gruppenmitglied", "Du bist kein Mitglied dieser Gruppe");
			}
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	}
});