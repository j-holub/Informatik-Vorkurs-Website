// publisht alle Gruppen
Meteor.publish('groups', function(groupId){
	if(this.userId){
		// spezielle Gruppe
		if(groupId){
			// var group = Groups.find(groupId);
			// var members = Meteor.users.find({_id: {$in: group.fetch()[0].members}});
			// var bots = Robots.find({'belongsTo': {$in: group.fetch()[0].members}});
			// var dataIds = [];
			// bots.forEach(function (bot) {
			// 	dataIds.push(bot.data);
			// });
			// var botData = RobotData.find({_id: {$in: dataIds}});

			// leider muss alles gepublisht werden, da die reactivity sonst nicht funktioniert.
			// Irgend ein Bug in Iron Router oder eine Unfähigkeit Meinerseits
			return [
				Groups.find(groupId),
				Meteor.users.find(),
				Robots.find(),
				RobotData.find()
			];
		}
		// alle Gruppen
		else{
			return [
				Groups.find(),
				Meteor.users.find()
			];
		}
	}
});

Meteor.publish('usergroup', function(){
	if(this.userId){
		return Groups.find({'members': this.userId});
	}
});
