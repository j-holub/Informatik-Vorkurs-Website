
Template.tournaments.helpers({
	listTournaments: function () {
		return Tournaments.find();
	}
});



Template.tournamentDetail.helpers({
	userHasRobotInTournament: function () {
		// Roboter des Users
		var userRobots = Robots.find({belongsTo: Meteor.userId()}).fetch();
		// Roboter im Turnier
		var robotsInTournament = Tournaments.findOne({_id: this._id}).participants;
		var userHasRobotInTournament = false;
		// Checke für jeden Roboter ob er im Turnier ist
		userRobots.forEach(function (robot) {
			if($.inArray(robot._id, robotsInTournament) > -1){
				userHasRobotInTournament = true;
			}
		});
		return userHasRobotInTournament;
	}
});



Template.createTournament.events({
	'submit form': function (event) {
		// Verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Die Input Fields abfragen
		var name = $('[name=tournamentName]').val();
		// Turnier erstellen
		Meteor.call('createTournament', name, function (error, result) {
			if(error){
				console.log(error.reason);
			}
		});
		// Input Felder leeren
		$('[name=tournamentName]').val('');
	}
});



Template.tournamentParticipants.helpers({
	// TODO: fehler werfen wenn roboter schon im Turnier ist oder der User bereits ein Roboter im Turnier hat
	particpatingRobots: function () {
		var participantIds = Tournaments.findOne({_id: this._id}).participants;
		return Robots.find({_id: {$in: participantIds}}, {sort: {name: 1}});
	}
});



Template.tournamentEntry.helpers({
	listUserRobots: function () {
		var currentUserId = Meteor.userId();
		return Robots.find({belongsTo: currentUserId}, {sort: {name: 1}});
	}
});

Template.tournamentEntry.events({
	'submit form': function (event) {
		// Verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Die RoboterId raussuchen
		var chosenRobotId = $('[name=availableRobots]').val();
		// In das richtige Turnier eintragen
		Meteor.call('signUpRobot', this._id, chosenRobotId, function (error, result) {
			if(error){
				console.log(error.reason);
			}
		});
	}
});



Template.tournamentRobot.helpers({
	// sucht zu einer UserId ddes Uploaders en Vor- und Nachnamen raus
	uploaderName: function (uploaderId) {
		var uploader = Meteor.users.findOne({_id: uploaderId});
		var name = uploader.profile.firstname + " " + uploader.profile.lastname;
		return name;
	},
	belongsToUser: function(){
		// this._id referenziert die ID des Objeckts mit dem das Template gerendert wurde
		return Meteor.userId() == this.belongsTo;
	}
});

Template.tournamentRobot.events({
	'click [name=removeRobot]': function () {
		// TODO: hier eine bessere Methode suchen um an das richtige Turnier zu kommen
		var tournamentId = $('h3').data('id');
		// this._id referenziert den Roboter des Templates
		Meteor.call('signOutRobot', tournamentId, this._id, function (error, result) {
			if(error){
				console.log(error.reason);
			}
		});		
	}
});