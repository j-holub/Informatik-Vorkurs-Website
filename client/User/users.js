
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
	'keyup [name=userSearch]': _.throttle(function (event) {
		event.preventDefault();
		var searchText = $('[name=userSearch]').val();
		UserSearch.search(searchText);
	}, 200)
});

Template.users.rendered = function () {
	// führt beim rendern des Templates direkt eine leer Suche aus um alle User anzuzeigen
	UserSearch.search(' ');
	// fokusiert das Suchfeld 
	$('[name=userSearch]').focus();
};

