Template.groups.helpers({
	listGroups: function () {
		return Groups.find({}, {sort: {'name': 1}});
	},
	memberCount: function () {
		return this.members.length;
	}
});