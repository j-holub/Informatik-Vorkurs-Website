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
	},
	// wird in einem {{#with getMainbot}} Kontext aufgerufen,
	// daher referenziert this einen Roboter
	mainBotDownloadable: function() {
		return this.downloadable;
	},
	// wird in einem {{#with getMainbot}} Kontext aufgerufen,
	// daher referenziert this einen Roboter
	downloadUrl: function () {
		return RobotData.findOne(this.data).url({'download': true});
	}
});

Template.groupdetail.onRendered(function() {

	$('#groupname').fitText(1.5, {
		maxFontSize: '50em'
	});

	$('.subheading').fitText(1.8, {
		maxFontSize: '50em'
	});
});