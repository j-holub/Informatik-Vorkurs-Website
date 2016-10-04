
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
