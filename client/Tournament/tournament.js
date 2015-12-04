
Template.tournaments.helpers({
	listTournaments: function () {
		return Tournaments.find();
	}
});

Template.createTournament.events({
	'submit form': function (event) {
		// Verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Die Input Fields abfragen
		var name = $('[name=tournamentName]').val();
		Tournaments.insert({
			name: name,
			date: new Date(),
			participants: [],
		});
		// Input Felder leeren
		$('[name=tournamentName]').val('');
	}
});