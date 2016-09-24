Template.tournamentParticipants.helpers({
	particpatingGroups: function () {
		var participantIds = Tournaments.findOne({_id: this._id}).participants;
		var groups = Groups.find({_id: {$in: participantIds}}, {sort: {name: 1}}).fetch();

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
		// Teilnehmerlist
		var tournamentParticipants = Tournaments.findOne(this._id).participants;

		if(usergroup){
			return ($.inArray(usergroup._id, tournamentParticipants) == 0);
		}
		else{
			return false;
		}
	},
	// Erzeugt einen schöner formatierten Datum String aus dem Date Object des Turniers
	displayDate: function () {
		var date = this.date;
		var days = (date.getDate() <= 9 ? '0' : '') + date.getDate();
		var month = (date.getMonth() <= 9 ? '0' : '') + date.getMonth();
		var dateString = days+ "." + month + "." + date.getFullYear();
		return dateString;
	},
	// Gibt die anzahl der Teilnehmer aus
	paticipantCount: function(){
		var participantlist = Tournaments.findOne({_id: this._id}).participants;
		if(participantlist){
			return participantlist.length;
		}
		else{
			return 0;
		}
	},
	// Gibt an ob es überhaupt teilnehmer gibt
	hasParticipants: function(){
		return Tournaments.findOne({_id: this._id}).participants;
	},
	// checkt ob ein Turnier schon vorbei ist
	ended: function() {
		return this.date < new Date();
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
	userGroupHasMainbot: function () {
		var usergroup = Groups.findOne({members: Meteor.userId()});
		if(usergroup && usergroup.mainbot){
			return true;
		}
		else{
			return false;
		}
	},
	mainbotName: function() {
		var group = Groups.findOne({members: Meteor.userId()});
		if(group && group.mainbot){
			return Robots.findOne(group.mainbot).name;
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
	}
});


Template.tournamentGroup.helpers({
	userIsMember: function (){
		// this._id referenziert die ID des Objeckts (Group) mit dem das Template gerendert wurde
		return $.inArray(Meteor.userId(), this.members) == 0; 
	},
	// schaut ob das Turnier schon beendet wurde
	ended: function () {
		// da dieses Template innerhalb von tournamentDetail > tournamentParticipants
		var tournamentId = Template.parentData(2)._id;
		var tournamentDate = Tournaments.findOne({_id: tournamentId}).date;
		return tournamentDate < new Date();
	},
	mainbotName: function () {
		return Robots.findOne(this.mainbot).name;
	}
});

Template.tournamentGroup.events({
	'click [name=signOutFromTournament]': function (event) {
		// Wegen verschachtelung is das Turniertemplate 2 weiter oben
		// sollte beachtet werden, wenn an dieser Seite rumgebastelt wird
		var tournamentId = Template.parentData(2)._id;
		// this._id referenziert die Gruppe des Templates
		Meteor.call('signOutFromTournament', tournamentId, this._id, function (error, result) {
			if(error){
				console.log(error.reason);
			}
		});		
	},
});