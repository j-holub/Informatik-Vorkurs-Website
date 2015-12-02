
Template.robots.helpers({
	list: function () {
		return Robots.find({}, {sort: {name: 1}});
	}
});
