
Template.robots.helpers({
	listDownloadableRobots: function() {
		return Robots.find({'downloadable': true}, {sort: {'name': 1}});
	}
});

Template.robots.events({
	"click #foo": function(event, template){

	}
});




Template.robot.helpers({
	// sucht zu einer UserId ddes Uploaders en Vor- und Nachnamen raus
	uploaderName: function (uploaderId) {
		var uploader = Meteor.users.findOne({_id: uploaderId});
		var name = uploader.profile.firstname + " " + uploader.profile.lastname;
		alert(name);
		return name;
	},
	downloadUrl: function(){
		var robotFile = RobotData.findOne({_id: this.data});
		if(robotFile){
			return robotFile.url({download: true});
		}
	},
	belongsToUser: function(){
		// this._id referenziert die ID des Objeckts mit dem das Template gerendert wurde
		return Meteor.userId() == this.belongsTo;
	},
	belongsToUserOrIsAdmin: function() {
		return Meteor.userId() == this.belongsTo || Roles.userIsInRole(Meteor.user(), ["admin"]);
	},
	isDownloadable: function(){
		return this.downloadable;
	},
	checkDownloadableCondition: function(){
		// Gehört dem User || downloadbar || User ist Admin
		return (Meteor.userId() == this.belongsTo) || (this.downloadable) || Roles.userIsInRole(Meteor.user(), ["admin"]);
	}
});

Template.robot.events({
	"click #foo": function(event, template){

	}
});
