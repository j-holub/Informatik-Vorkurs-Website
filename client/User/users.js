
Template.users.helpers({
	listUsers: function () {
		// return Meteor.users.find({}, {sort: {lastname: 1}}).fetch();
		return UserSearch.getData({
			transform: function(matchText, regExp){
				return matchText.replace(regExp, "<b>$&</b>")
			},
		});
	}
});

// Sucheingabe feld
Template.users.events({
	// handelt die Suche
	'keyup [name=userSearch]': _.throttle(function (event) {
		event.preventDefault();
		var searchText = $('[name=userSearch]').val();
		UserSearch.search(searchText);
	}, 200),
	// öffnet das erste Suchergebnis
	'keypress [name=userSearch]': function(event){
		// Enter Key abfragen
		if(event.charCode == 13){
			// Holt den link des ersten Users aus dem a Element
			// TODO Error wenn kein suchergebnis da ist verhindern. Evtl per Session Variable die Anzahl der Ergebnisse sichern
			var link = $('#userList').find('a')[0].href;
			// Gehe zu link
			Router.go(link);
		}
	}
});


Template.users.rendered = function () {
	// führt beim rendern des Templates direkt eine leer Suche aus um alle User anzuzeigen
	UserSearch.search(' ');
	// fokusiert das Suchfeld (außer im Firefox)
	$('[name=userSearch]').focus();
};

