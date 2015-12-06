
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
	}
});

Template.robot.events({
	'click [name=deleteRobot]': function () {
		// this._id referenziert die ID des Objeckts mit dem das Template gerendert wurde
		Robots.remove({_id: this._id});
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
	'submit form': function (event) {
		// verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Daten sammeln
		var name = $('[name=robotName]').val();
		var description = $('[name=robotDescription]').val();
		var currentUserId = Meteor.userId();
		// Roboter in die Datenbank eintragen
		Robots.insert({
			name: name,
			description: description,
			dateUploaded: new Date(),
			belongsTo: currentUserId,
			downloadable: false,
		});
		// Eingabefelder leeren
		$('[name=robotName]').val('');
		$('[name=robotDescription]').val('');
	}
});