// publisht alle Gruppen
Meteor.publish('groups', function(groupId){
	if(this.userId){
		// spezielle Gruppe
		if(groupId){
			var group = Groups.find(groupId);
			var members = Meteor.users.find({_id: {$in: group.fetch()[0].members}});
			var bots = Robots.find({'belongsTo': {$in: group.fetch()[0].members}})
			var dataIds = [];
			bots.forEach(function (bot) {
				dataIds.push(bot.data);
			});
			var botData = RobotData.find({_id: {$in: dataIds}});
			return [group, members, bots, botData];
		}
		// alle Gruppen
		else{
			return Groups.find();
		}
	}
});