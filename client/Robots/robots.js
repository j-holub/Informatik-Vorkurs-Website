
Template.robots.helpers({
	// Listet alle Roboter auf
	list: function () {
		return Robots.find({}, {sort: {name: 1}});
	}
});


