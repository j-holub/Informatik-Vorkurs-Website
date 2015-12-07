
// RobotData

RobotData.allow({
	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		//...
	},
	remove: function (userId, doc) {
		//...
	},
	fetch: ['owner'],
	transform: function () {
		//...
	}
});