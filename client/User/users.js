
Template.users.helpers({
	listUsers: function () {
		return Meteor.users.find({}, {sort: {lastname: 1}}).fetch();
	}
});

