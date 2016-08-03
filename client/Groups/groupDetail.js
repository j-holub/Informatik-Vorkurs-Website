Template.groupdetail.helpers({
	listMembers: function () {
		return Meteor.users.find({_id: {$in: this.members}});
	},
	getMainbot: function() {
		if(this.mainbot){
			return Robots.findOne(this.mainbot);
			
		}
	},
	memberBots: function() {
		return Robots.find({'belongsTo': {$in: this.members}});
	},
	isCreator: function() {
		return this.creator === Meteor.userId();
	}
});