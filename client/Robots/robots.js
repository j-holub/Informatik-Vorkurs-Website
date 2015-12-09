
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
		console.log("foo?");
		var robot = Robots.findOne({_id: this._id});
		var robotId = robot._id;
		// Daten löschen
		console.log("That's where I am");
		RobotData.remove({_id: robot.data._id}, function(error, file){
			if(error){
				console.log(error.reason);
			}
			else{
				// Den Roboter selbst löschen
				Robots.remove({_id: robotId});
			}
		});
	},
	'change [name=downloadState]': function(event){
		// this._id referenziert die Id des Roboters mit dem das Template gerendert wurde
		var robotId = this._id;
		// status in der Datenbank updaten
		Robots.update({_id: robotId}, {$set: {downloadable: event.target.checked}});
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
				Robots.insert({
					name: name,
					description: description,
					dateUploaded: new Date(),
					belongsTo: currentUserId,
					downloadable: false,
					data: uploadedRobot,
				});
				// Uploadform resetten
				$('#uploadRobot')[0].reset();

			}
		});
		
	}
});