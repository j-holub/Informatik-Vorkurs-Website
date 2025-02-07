
Template.tournaments.helpers({
	listTournaments: function () {
		return Tournaments.find();
	},
	// Formatiert das Ergebnis direkt als Matrix zum anzeigen in der Web UI
	listActiveTournaments: function() {

		// Date Objekt für morgen
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() - 1);
		var data = Tournaments.find({
			date: { $gte: tomorrow }
		}).fetch();


		var formattedResultList;

		// Nur wenn es mehr als 2 Einträge gibt, brauchen wir eine Matrix
		if(data.length > 2){

			// array für die Reihen anlegen
			formattedResultList = new Array(Math.ceil(data.length / 2));

			// in jedem Eintrag ein eigenes Array (Spalten) erstellen
			for (var i = 0; i < formattedResultList.length; i++) {
				formattedResultList[i] = [];
			}

			// die Turniere entsprechend einsortieren
			for (var i = 0; i < data.length; i++) {
				formattedResultList[Math.floor(i/2)][i % 2] = data[i];
			}

		}
		else{
			formattedResultList = new Array(1);
			formattedResultList[0] = data;
		}

		return formattedResultList;
	},
	// Formatiert das Ergebnis direkt als Matrix zum anzeigen in der Web UI
	listPastTournaments: function() {
		var data = Tournaments.find({
			date: { $lte: new Date }
		}).fetch();

		var formattedResultList;

		// Nur wenn es mehr als 2 Einträge gibt, brauchen wir eine Matrix
		if(data.length > 2){

			// array für die Reihen anlegen
			formattedResultList = new Array(Math.ceil(data.length / 2));

			// in jedem Eintrag ein eigenes Array (Spalten) erstellen
			for (var i = 0; i < formattedResultList.length; i++) {
				formattedResultList[i] = [];
			}

			// die Turniere entsprechend einsortieren
			for (var i = 0; i < data.length; i++) {
				formattedResultList[Math.floor(i/2)][i % 2] = data[i];
			}

		}
		else{
			formattedResultList = new Array(1);
			formattedResultList[0] = data;
		}

		return formattedResultList;
	}
});

Template.tournaments.events({
	'click #pastTournamentsButton': function(event){
		$('#pastTournamentsButton').addClass('invisible');
		$('#pastTournaments').css('max-height', '10000px');
	},
	'click .deleteTournament': function(){
		Meteor.call('deleteTournament', this._id, function (error, result) {
			if(error){
				Meteor.customFunctions.errorToast(error.reason);
			}
		});
	}
});

Template.tournaments.onRendered(function(){
	// FitTextJS
	$('h1').fitText(1.5, {
		maxFontSize: '50em'
	});
});

Template.tournament.helpers({
	// Erzeugt einen schöner formatierten Datum String aus dem Date Object des Turniers
	displayDate: function () {
		var date = this.date;
		var days = (date.getDate() <= 9 ? '0' : '') + date.getDate();
		var monthNumber = date.getMonth() + 1;
		var month = (monthNumber <= 9 ? '0' : '') + monthNumber;
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
				Meteor.customFunctions.errorToast(error.reason);
			}
			else{
				// Input Felder leeren
				$('#createTournament')[0].reset();
				// Modal unsichtbar machen
				$('#createTournamentModal').removeClass('active');
			}
		});
		
	},
	'click #createTournamentButton': function(event){
		$('#createTournamentModal').addClass('active');
	},
	'click .modalClose': function(){
		// Form resetten
		$('#createTournament')[0].reset();
		// Modal unsichtbar machen
		$('#createTournamentModal').removeClass('active');
	},
	'click .modalBackground': function(event){
		// verhindert das schließen durch das klicken auf das Modal selbst
		if(!(event.target != $('.modalBackground')[0])){
			// Form resetten
			$('#createTournament')[0].reset();
			// Modal unsichtbar machen
			$('#createTournamentModal').removeClass('active');
		}
	}
});