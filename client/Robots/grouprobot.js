
// # ################################################ #
// # Erbt die Helper und Events profileRobot Template #
// # Siehe profilerobot.js     						  #
// # ################################################ #


Template.groupRobot.helpers({
	// wird innerhalb des groupDetail Templates aufgerufen und benötigt dessen parentData
	userIsGroupMember: function () {
		return $.inArray(Meteor.userId(), Template.parentData().members) != -1;
	},
	belongsToUserOrIsAdmin: function() {
		return Meteor.userId() == this.belongsTo || Roles.userIsInRole(Meteor.user(), ["admin"]);
	},
});


Template.groupRobot.events({
	'change .toggleBox': function(event){
		// this._id referenziert die Id des Roboters mit dem das Template gerendert wurde
		let robotId = this._id;
		// status in der Datenbank updaten
		Meteor.call('changeDownloadState', robotId, event.target.checked, function (error, result) {
			if(error){
				console.log(error.reason)
			}
		});
	},
});
