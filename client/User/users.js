
Template.users.helpers({
	listUsers: function () {
		// return Meteor.users.find({}, {sort: {lastname: 1}}).fetch();
		let data = UserSearch.getData({
			transform: function(matchText, regExp){
				return matchText.replace(regExp, "<b>$&</b>")
			},
			sort: {'profile.firstname': 1}
		});

		return data;
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
		UserSearch.search(searchText, {blankSearch: true});
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
			UserSearch.search('', {blankSearch: true});
		}
	}
});


Template.users.rendered = function () {
	// führt beim rendern des Templates direkt eine leer Suche aus um alle User anzuzeigen
	UserSearch.search(' ');

	if(Meteor.Device.isDesktop()){
		// fokusiert das Suchfeld (außer im Firefox)
		$('[name=userSearch]').focus();
	}
};




Template.user.helpers({
	// wird immer mit dem user als this aufgerufen
	// gibt an ob ein user die Rolle role hat
	hasRole: function (role) {
		return ($.inArray(role, this.roles) != -1);
	}
});
