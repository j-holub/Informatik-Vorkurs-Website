
// # ################################################ #
// # Erbt die Helper und Events profileRobot Template #
// # Siehe profilerobot.js     						  #
// # ################################################ #


Template.groupRobot.helpers({
	// wird innerhalb des groupDetail Templates aufgerufen und benötigt dessen parentData
	userIsGroupMember: function () {
		return $.inArray(Meteor.userId(), Template.parentData().members) != -1;
	}
});

Template.groupRobot.events({
	// Trägt den Roboter als Gruppenroboter ein
	'click [name="selectAsMainRobot"]': function () {
		Meteor.call('selectGroupRobot', Template.parentData()._id, this._id, function (error, result) {
			if(error){
				console.log(error.reason);
			}
		});
	}
});