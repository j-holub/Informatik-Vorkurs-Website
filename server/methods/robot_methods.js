Meteor.methods({
	// fügt ein Roboter in die Datenbank ein
	'uploadRobot': function(name, description, uploadedRobotFileId){
		// überprüfen ob aktuell ein User eingeloggt ist
		if(Meteor.userId()){
			// Felder validieren
			// Die check funktion beendet die Funktion bei einem Fehler
			// check(name, String);
			// check(description, String);
			// Datensatz anlegen
			var data = {
				name: name,
				description: description,
				belongsTo: Meteor.userId(),
				data: uploadedRobotFileId
			};
			// Den Roboter in der Datenbank anlegen
			return Robots.insert(data);
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
	// Löscht einen Roboter
	'deleteRobot': function(robotId){
		// überpürfen ob aktuell ein User eingeloggt ist
		if(Meteor.userId()){
			// überprüfen ob der Roboter überhaupt dem User gehört
			if(Meteor.userId() == Robots.findOne({_id: robotId}).belongsTo){
				// In allen Turnieren austragen
				Tournaments.find({participants: {$in: [robotId]}}).forEach(function (tournament) {
					Meteor.call('signOutRobot', tournament._id, robotId);
				});
				return Robots.remove({_id: robotId});
			}
			// ansonsten Fehler werfen
			else{
				throw new Meteor.Error("Keine Berechtigung", "Du hast keine Berechtigung diesen Roboter zu löschen");
			}
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");	
		}
	},
	'changeDownloadState': function(robotId, checkState){
		// überprüfen ob aktuell ein User eingeloggt ist
		if(Meteor.userId()){
			// überprüfen ob der Roboter überhaupt dem User gehört
			if(Meteor.userId() == Robots.findOne({_id: robotId}).belongsTo){		
				Robots.update({_id: robotId}, {$set: {downloadable: checkState}});
			}
			// ansonsten Fehler werfen
			else{
				throw new Meteor.Error("Keine Berechtigung", "Du hast keine Berechtigung diesen Roboter zu ändern");
			}
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
});