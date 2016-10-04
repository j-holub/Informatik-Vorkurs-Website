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
				// wenn die Gruppe zu irgendwelchen Turnieren angemeldet war, muss sie abgemeldet werden
				Tournaments.update({
					'participants.group': groupId
				},
				{
				 	$pull: {'participants': {'group': groupId}}
				},
                {
                    'multi': true
                });
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

					// Sollte es Roboter geben die zu einem Turnier eingetragen sind und
					// dem User gehören, der die Gruppe verlässt, müssen diese ausgetragen werden

					// eine Liste aller RoboterIds
					var userRobotIds = Robots.find({'belongsTo': userId}).map(function (robot) {
						return robot._id;
					});

					// Aus allen Turnieren austrage
					Tournaments.update({
						'participants.robot': {$in: userRobotIds}
					}, {
						$pull: {'participants': {'robot': {$in: userRobotIds}}}
					});	
				

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
							console.log(error.reason);
						}
					});
				}
				// wenn nicht, einen neuen Gruppenleiter aussuchen
				else{
					var newCreatorId = Groups.findOne(groupId).members[0];
					Groups.update({_id: groupId}, {$set: {'creator': newCreatorId}});
				}

				// Sollte es Roboter geben die zu einem Turnier eingetragen sind und
				// dem User gehören, der die Gruppe verlässt, müssen diese ausgetragen werden

				// eine Liste aller RoboterIds
				var userRobotIds = Robots.find({'belongsTo': Meteor.userId()}).map(function (robot) {
					return robot._id;
				});

				// Aus allen Turnieren austrage
				Tournaments.update({
					'participants.robot': {$in: userRobotIds}
				}, {
					$pull: {'participants': {'robot': {$in: userRobotIds}}}
				});	
				

			}
			// wenn nicht, Fehler werfen
			else{
				throw new Meteor.Error("Kein Gruppenmitglied", "Du bist kein Mitglied dieser Gruppe");
			}
		}
	},
});