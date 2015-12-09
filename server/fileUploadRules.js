
// RobotData

RobotData.allow({
	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		return false;
	},
	remove: function (userId, doc) {
		return true;
		// return (userId && doc.metadata.owner === userId);
	},
	download: function(userId, doc){
		return true;
	},
	fetch: ['owner'],
});