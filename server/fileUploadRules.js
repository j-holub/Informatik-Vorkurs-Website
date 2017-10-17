
// RobotData

RobotData.allow({
	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		return true;
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

//DocumentData

DocumentData.allow({
	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		return true;
	},
	remove: function (userId, doc) {
		return true;
	},
	download: function(userId, doc){
		return true;
	},
	fetch: ['owner'],
});
