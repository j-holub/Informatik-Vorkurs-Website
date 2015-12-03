
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
			belongsTo: currentUserId
		});
		// Eingabefelder leeren
		$('[name=robotName]').val('');
		$('[name=robotDescription]').val('');
	}
});