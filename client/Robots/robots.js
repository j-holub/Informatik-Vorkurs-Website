

Template.robots.helpers({
	// Listet alle Roboter auf
	list: function () {
		return Robots.find({}, {sort: {name: 1}});
	}
});


Template.userRobots.helpers({
	// Listet alle Roboter auf die zu dem, mit der Id angegebenen User gehören
	listUserRobots: function (userId) {
		return Robots.find({belongsTo: userId}, {sort: {dateUploaded: 1}});
	}
});

Template.robot.helpers({
	// sucht zu einer UserId ddes Uploaders en Vor- und Nachnamen raus
	uploaderName: function (uploaderId) {
		var uploader = Meteor.users.findOne({_id: uploaderId});
		var name = uploader.profile.firstname + " " + uploader.profile.lastname;
		return name;
	},
	belongsToUser: function(){
		// this._id referenziert die ID des Objeckts mit dem das Template gerendert wurde
		return Meteor.userId() == this.belongsTo;
	},
	isDownloadable: function(){
		return this.downloadable;
	},
	isDownloadableOrBelongsToUser: function(){
		return (Meteor.userId() == this.belongsTo) || (this.downloadable);
	}
});

Template.robot.events({
	'click [name=deleteRobot]': function () {
		// this._id referenziert die ID des Objeckts mit dem das Template gerendert wurde
		var robot = Robots.findOne({_id: this._id});
		var robotId = robot._id;
		// Daten löschen
		var deletedRobot = RobotData.remove({_id: robot.data._id}, function(error, file){
			if(error){
				console.log(error.reason);
			}
			else{
				// Den Roboter selbst löschen
				Meteor.call('deleteRobot', robotId, function (error, result) {
					if(error){
						// Ist das löschen in der DB fehlgschlagen fügen wir die Daten auch wieder hinzu
						RobotData.insert(deletedRobot);
						console.log(error.reason);
					}
				});
			}
		});
	},
	'change [name=downloadState]': function(event){
		// this._id referenziert die Id des Roboters mit dem das Template gerendert wurde
		var robotId = this._id;
		// status in der Datenbank updaten
		Meteor.call('changeDownloadState', robotId, event.target.checked, function (error, result) {
			if(error){
				console.log(error.reason)
			}
		});
	}
});


Template.uploadRobot.events({
	// Handelt das Upload Formular um einen Roboter hochzuladen
	'submit form': function (event, template) {
		// verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Daten sammeln
		var name = $('[name=robotName]').val();
		var description = $('[name=robotDescription]').val();
		var robotFile = template.find('input:file').files[0];
		var currentUserId = Meteor.userId();
		// Robot Data hochladen
		var uploadedRobot = RobotData.insert(robotFile, function(error, fileObj){
			// Überprüfung ob es fehler gab
			if(error){
				console.log(error.reason);
			}
			// wenn nicht den Roboter anlegen
			else{
				// Roboter in die Datenbank eintragen
				Meteor.call('uploadRobot', name, description, uploadedRobot, function(error, resultId){
					if(error){
						// löscht die Daten für den Fall, dass das eintragen des Roboters in die Datenbank fehlgeschlagen ist
						RobotData.remove(uploadedRobot);
						console.log(error.reason);
					}
				});
				// Uploadform resetten
				$('#uploadRobot')[0].reset();

			}
		});
		
	}
});