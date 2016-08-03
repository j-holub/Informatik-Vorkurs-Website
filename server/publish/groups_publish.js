// publisht alle Gruppen
Meteor.publish('groups', function(groupId){
	if(this.userId){
		// spezielle Gruppe
		if(groupId){
			var group = Groups.find(groupId);
			var members = Meteor.users.find({_id: {$in: group.fetch()[0].members}});
			var bots = Robots.find({'belongsTo': {$in: group.fetch()[0].members}})
			return [group, members, bots];
		}
		// alle Gruppen
		else{
			return Groups.find();
		}
	}
});