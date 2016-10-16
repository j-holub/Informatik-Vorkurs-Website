Template.tournamentParticipants.helpers({
	particpatingGroups: function () {
		var participants = Tournaments.findOne({_id: this._id}).participants;
		// die liste der GruppenIds, der Gruppen die am Turnier teilnehmen, auflisten
		var participantsIdList = [];
		participants.forEach(function (participant) {
			participantsIdList.push(participant.group);
		});
		// alle Gruppen raussuchen
		var groups = Groups.find({_id: {$in: participantsIdList}}, {sort: {name: 1}}).fetch();

		var formattedResultList;
		if(groups.length > 3){

			// Rückgabeliste basteln
			formattedResultList = new Array(Math.ceil(groups.length / 3));
			
			// neues Array in jedem eintrag erstellen
			for (var i  = 0; i  < formattedResultList.length; i++) {
				formattedResultList[i] = [];
			};

			// Die Suchergebnisse entsprechend einsortieren
			for (var i = 0; i < groups.length; i++) {
				formattedResultList[Math.floor(i/3)][i % 3] = groups[i];
			};

		}
		else{
			formattedResultList = new Array(1);
			formattedResultList[0] = groups;
		}

		// an den Client liefern
		return formattedResultList;
	}
});

Template.tournamentDetail.helpers({
	userGroupIsInTournament: function () {
		// Gruppe des Users
		var usergroup = Groups.findOne({members: Meteor.userId()});
		if(usergroup){
			// Sucht nach dem Turnier mit der richtigen ID und der eingetragenen Gruppe
			var tournament = Tournaments.findOne({
				_id: this._id,
				'participants.group': usergroup._id
			});
			// es gibt ein solches Turnier
			if(tournament){
				return true;
			}
			// es gibt kein solches Turnier
			else{
				return false;
			}
		}
		else{
			return false;
		}
	},
	// Erzeugt einen schöner formatierten Datum String aus dem Date Object des Turniers
	displayDate: function () {
		var date = this.date;
		if(date){
			var days = (date.getDate() <= 9 ? '0' : '') + date.getDate();
			var month = (date.getMonth() <= 9 ? '0' : '') + date.getMonth();
			var dateString = days+ "." + month + "." + date.getFullYear();
			return dateString;
		}
	},
	// Gibt die anzahl der Teilnehmer aus
	paticipantCount: function(){
		var tournament = Tournaments.findOne({_id: this._id});
		if(tournament){
			return tournament.participants.length;
		}
		else{
			return 0;
		}
	},
	// Gibt an ob es überhaupt teilnehmer gibt
	hasParticipants: function(){
		var tournament = Tournaments.findOne({_id: this._id});
		if(tournament){
			return (Tournaments.findOne({_id: this._id}).participants.length > 0);			
		}
	},
	// checkt ob ein Turnier schon vorbei ist
	ended: function() {
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() - 1);
		return this.date < tomorrow;
	},
	userHasRobots: function(){
		var userRobots = Robots.find({belongsTo: Meteor.userId()}).fetch();
		return userRobots.length > 0;
	}
});

Template.tournamentDetail.onRendered(function(){
	// FitTextJS
	$('h1').fitText(1.5, {
		maxFontSize: '50em'
	});
});


Template.tournamentEntry.helpers({
	userHasGroup: function () {		
		return Groups.find({members: Meteor.userId()}).count() > 0;

	},
	userGroupHasRobots: function () {
		if(Groups.findOne({members: Meteor.userId()})){
			// die members liste is eh nur eine Liste von IDs, genau so wie das belongsTo Feld der Roboer
			var groupMembers = Groups.findOne({members: Meteor.userId()}).members;
			return Robots.find({belongsTo: {$in: groupMembers}}).count() > 0;
		}
		else{
			return false;
		}
	},
	listGroupRobots: function() {
		var usergroup = Groups.findOne({members: Meteor.userId()});
		if(usergroup){
			return Robots.find({belongsTo: {$in: usergroup.members}});
		}
	}
});

Template.tournamentEntry.events({
	'click [name=signUpForTournament]': function(event){
		var groupId = Groups.findOne({members: Meteor.userId()})._id;
		var tournamentId = this._id;
		Meteor.call('signUpForTournament', tournamentId, groupId, function (error, result) {
			if(error){
				console.log(error.reason);
			}
		});
	},
	'click #openEntryModal': function(event){
		$('#enterRobotModal').addClass('active');
	},
	'click .modalClose': function(event){
		// Modal schließen
		$('#enterRobotModal').removeClass('active');
	},
	'click .modalBackground': function(event) {
		if(!(event.target != $('.modalBackground')[0])){
			// Modal schließen
			$('#enterRobotModal').removeClass('active');
		}
	},
	'click .robot': function(event) {
		// das Turnier aus dem parent template holen
		var tournament = Template.parentData();
		var robot      = this;

		Meteor.call('signUpForTournament', tournament._id, robot._id, function (error, result) {
			if(error){
				console.log(error.reason);
			}
		});
	}
});


Template.tournamentGroup.helpers({
	userIsMember: function (){
		// this._id referenziert die ID des Objeckts (Group) mit dem das Template gerendert wurde
		return $.inArray(Meteor.userId(), this.members) != -1; 
	},
	// schaut ob das Turnier schon beendet wurde
	ended: function () {
		// da dieses Template innerhalb von tournamentDetail > tournamentParticipants
		var tournamentId = Template.parentData(2)._id;
		var tournamentDate = Tournaments.findOne({_id: tournamentId}).date;

		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() - 1);
		return tournamentDate < tomorrow;
	},
	botName: function () {
		// Das Turnier aus dem Parent Kontext holen
		// Wird die Template Stuktur im HTML verändert, muss auch hier etwas geändert werden
		var tournament = Template.parentData(2);
		var robotName;
		tournament.participants.forEach(function (participant) {
			if(participant.group === this._id){
				robotName = Robots.findOne(participant.robot).name;
			}
		}.bind(this));
		return robotName;
	}
});

Template.tournamentGroup.events({
	'click [name=signOutFromTournament]': function (event) {
		// Wegen verschachtelung is das Turniertemplate 2 weiter oben
		// sollte beachtet werden, wenn an dieser Seite rumgebastelt wird
		var tournamentId = Template.parentData(2)._id;
		// this._id referenziert die Gruppe des Templates
		Meteor.call('signOutFromTournament', tournamentId, function (error, result) {
			if(error){
				console.log(error.reason);
			}
		});		
	},
});