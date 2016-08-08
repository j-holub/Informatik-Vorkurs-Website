
SearchSource.defineSource('users', function(searchText, options){
	// Optionen für die MongoDb suche
	var mongoOptions = {sort: {'profile.lastname': 1}};

	// Optionen für die Suche selber
	var searchOptions = _.defaults(options ? options : {}, {blankSearch: false});

	// Nur wenn ein Suchtext da ist soll gesucht werden
	if(searchText){
		// RegularExpression basteln
		var searchWords = searchText.trim().split(' ');
		var searchRegEx = new RegExp('(' + searchWords.join('|') + ')', 'ig');
		// console.log(searchRegEx)
		// selektor für die Suche
		var selector = {$or: [
			{'profile.firstname': searchRegEx},
			{'profile.lastname':  searchRegEx}
		]};
		// Die Suchanfrage
		return Meteor.users.find(selector, mongoOptions).fetch();
	}
	// Ohne suchtext einfach alle User ausgeben
	else{
		if(searchOptions.blankSearch){
			return Meteor.users.find({}, mongoOptions).fetch();
		}
		else{
			// Das sollte niemanden finden
			return Meteor.users.find({_id: ''}, mongoOptions).fetch();
		}
	}
});