
SearchSource.defineSource('users', function(searchText, options){
	// Optionen für die MongoDb suche
	var options = {sort: {'profile.lastname': 1}};

	// Nur wenn ein Suchtext da ist soll gesucht werden
	if(searchText){
		// RegularExpression basteln
		var searchWords = searchText.trim().split(' ');
		var searchRegEx = new RegExp('(' + searchWords.join('|') + ')', 'ig');
		console.log(searchRegEx)
		// selektor für die Suche
		var selector = {$or: [
			{'profile.firstname': searchRegEx},
			{'profile.lastname':  searchRegEx}
		]};
		// Die Suchanfrage
		return Meteor.users.find(selector, options).fetch();
	}
	// Ohne suchtext einfach alle User ausgeben
	else{
		return Meteor.users.find({}, options).fetch();
	}
});