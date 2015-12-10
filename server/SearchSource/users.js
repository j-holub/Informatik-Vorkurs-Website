
SearchSource.defineSource('users', function(searchText, options){
	// Optionen für die MongoDb suche
	var options = {sort: {lastname: 1}};

	// Nur wenn ein Suchtext da ist soll gesucht werden
	if(searchText){
		// RegularExpression basteln
		var searchWords = searchText.trim().split(' ');
		var searchRegEx = new RegExp('(' + searchWords.join('|') + ')', 'ig');
		// selektor für die Suche
		var selector = {$or: [
			{firstname: searchRegEx},
			{lastname:  searchRegEx}
		]};
		// Die Suchanfrage
		return Meteor.users.find(selector, options).fetch();
	}
	// Ohne suchtext einfach alle User ausgeben
	else{
		return Meteor.users.find({}, options).fetch();
	}
});