Template.profile.helpers({
	isActiveUser: function(id){
		return (id == Meteor.userId());
	}
});


Template.userRobots.helpers({
	// Listet alle Roboter auf die zu dem, mit der Id angegebenen User gehören
	listUserRobots: function (userId) {
		return Robots.find({belongsTo: userId}, {sort: {dateUploaded: 1}});
	}
});

Template.profileRobot.helpers({
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

Template.profileRobot.events({
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
	},
});

