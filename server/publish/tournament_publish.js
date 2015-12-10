Meteor.publish('tournaments', function(tournamentId){
	// Nur für eingeloggte User
	if(this.userId){
		// spezielles tournament
		if(tournamentId){
			var tournament = Tournaments.find({_id: tournamentId});
			return [
				tournament,
				Robots.find({_id: {$in: [tournament.participants]}})
			]
		}
		// ansonsten einfach alle publishen
		else{
			return Tournaments.find();
		}
	}
});