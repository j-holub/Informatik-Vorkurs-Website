Template.profile.helpers({
	isActiveUser: function(id){
		return (id == Meteor.userId());
	}
});