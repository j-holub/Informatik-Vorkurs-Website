
Template.users.helpers({
	listUsers: function () {
		// return Meteor.users.find({}, {sort: {lastname: 1}}).fetch();
		var data = UserSearch.getData({
			transform: function(matchText, regExp){
				return matchText.replace(regExp, "<b>$&</b>")
			},
			sort: {'profile.firstname': 1}
		});

		var formattedResultList;

		if(data.length > 4){

		// Rückgabeliste basteln
		formattedResultList = new Array(Math.ceil(data.length / 4));
		// neues Array in jedem eintrag erstellen
		for (var i = 0; i < formattedResultList.length; i++) {
			formattedResultList[i] = [];
		}
		// Die Suchergebnisse entsprechend einsortieren
		for (var i = 0; i < data.length; i++) {
			formattedResultList[Math.floor(i/4)][i % 4] = data[i];
		}

		}
		else{
			formattedResultList = new Array(1);
			formattedResultList[0] = data;
		}

		// an den Client liefern
		return formattedResultList;
	},
	// überprüft ob die Suche noch am laden ist
	isLoading: function(){
		return UserSearch.getStatus().loading;
	},
});

// Sucheingabe feld
Template.users.events({
	// handelt die Suche
	'keyup [name=userSearch]': _.throttle(function (event) {
		event.preventDefault();
		var searchText = $('[name=userSearch]').val();
		UserSearch.search(searchText);
	}, 200),
	// Tastenevents für die Suchleiste
	'keypress [name=userSearch]': function(event){
		// Enter Key abfragen
		if(event.charCode == 13){
			// Holt den link des ersten Users aus dem a Element
			// TODO Error wenn kein suchergebnis da ist verhindern. Evtl per Session Variable die Anzahl der Ergebnisse sichern
			var link = $('#userList').find('a')[0].href;
			// Gehe zu link
			Router.go(link);
		}
		// Escape Key abfragen
		else if(event.charCode == 27){
			$('[name=userSearch]').val(' ');
			$('[name=userSearch]').blur();
			// leere Suche
			UserSearch.search(' ');
		}
	}
});


Template.users.rendered = function () {
	// führt beim rendern des Templates direkt eine leer Suche aus um alle User anzuzeigen
	UserSearch.search(' ');
	// fokusiert das Suchfeld (außer im Firefox)
	$('[name=userSearch]').focus();
};




Template.user.helpers({
	// wird immer mit dem user als this aufgerufen
	// gibt an ob ein user die Rolle role hat
	hasRole: function (role) {
		return ($.inArray(role, this.roles) != -1);
	}
});

