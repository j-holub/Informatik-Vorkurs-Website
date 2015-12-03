
Template.users.helpers({
	listUsers: function () {
		return Meteor.users.find({}, {sort: {lastname: 1}}).fetch();
	}
});

Template.profile.helpers({
	isActiveUser: function(id){
		return (id == Meteor.userId());
	}
})