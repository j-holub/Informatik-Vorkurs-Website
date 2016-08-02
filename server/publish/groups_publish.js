// publisht alle Gruppen
Meteor.publish('groups', function(groupId){
	if(this.userId){
		// spezielles snippet
		if(groupId){
			return Groups.find({
				_id: groupId
			});
		}
		// alle snippets
		else{
			return Groups.find();
		}
	}
});