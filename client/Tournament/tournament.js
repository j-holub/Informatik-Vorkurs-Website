
Template.tournaments.helpers({
	listTournaments: function () {
		return Tournaments.find();
	}
});

Template.tournament.helpers({
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
	},
	'click #createTournamentButton': function(event){
		// Button unsichtbar machen
		$('#createTournamentButton').addClass('invisible');
		// Formular sichtbar machen
		$('#createTournament').removeClass('invisible');
		// Erstes Feld fokusieren
		$('[name=tournamentName]').focus();
	}
});