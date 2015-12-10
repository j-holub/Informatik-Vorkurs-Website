
Template.users.helpers({
	listUsers: function () {
		// return Meteor.users.find({}, {sort: {lastname: 1}}).fetch();
		return UserSearch.getData({});
	}
});

Template.users.events({
	'keyup [name=userSearch]': _.throttle(function (event) {
		event.preventDefault();
		var searchText = $('[name=userSearch]').val();
		UserSearch.search(searchText);
	}, 200)
});

