
Template.tournaments.helpers({
	listTournaments: function () {
		return Tournaments.find();
	}
});

Template.tournament.helpers({
	// Erzeugt einen schöner formatierten Datum String aus dem Date Object des Turniers
	displayDate: function () {
		var date = this.date;
		var dateString = date.getDate() + " " + date.getMonth() + " " + date.getFullYear();
		return dateString;
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
	},
	// Erzeugt einen schöner formatierten Datum String aus dem Date Object des Turniers
	displayDate: function () {
		var date = this.date;
		var dateString = date.getDate() + " " + date.getMonth() + " " + date.getFullYear();
		return dateString;
	},
	// checkt ob ein Turnier schon vorbei ist
	ended: function() {
		return this.date < new Date();
	}
});



Template.createTournament.events({
	'submit form': function (event) {
		// Verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Die Input Fields abfragen
		var name  = $('[name=tournamentName]').val();
		var day   = $('[name=day]').val();
		var month = $('[name=month]').val();
		var year  = $('[name=year]').val();
		// Date objekt erstellen
		date = new Date(year, month-1, day);
		// Turnier erstellen
		Meteor.call('createTournament', name, date, function (error, result) {
			if(error){
				console.log(error.reason);
			}
		});
		// Input Felder leeren
		$('#createTournament')[0].reset();
	}
});



Template.tournamentParticipants.helpers({
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
	},
	// schaut ob das Turnier schon beendet wurde
	ended: function() {
		// TODO: ier eine sinnvollere Methode suchen
		var tournamentId = $('h2').data('id');
		var tournamentDate = Tournaments.findOne({_id: tournamentId}).date;
		return tournamentDate < new Date();
	}
});

Template.tournamentRobot.events({
	'click [name=removeRobot]': function () {
		// TODO: hier eine bessere Methode suchen um an das richtige Turnier zu kommen
		var tournamentId = $('h2').data('id');
		// this._id referenziert den Roboter des Templates
		Meteor.call('signOutRobot', tournamentId, this._id, function (error, result) {
			if(error){
				console.log(error.reason);
			}
		});		
	},
});