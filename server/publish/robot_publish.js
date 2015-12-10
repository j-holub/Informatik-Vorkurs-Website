// Robter publishen
Meteor.publish('robots', function(specificUserId){
	// Wenn der user eingeloggt ist kann er alle Roboter sehen
	if(this.userId){
		// Schauen ob nur Roboter von einem spezifischen User gebraucht werden
		if(specificUserId){
			return [
				Robots.find({belongsTo: specificUserId}),
				// TODO nur die benötigten und auch downloadbaren roboter publishen
				RobotData.find()
			]
		}
		// ansonsten alle Roboter publishen und die user zu denen die Roboter gehören
		else{
			// alle Roboter
			var robots = Robots.find();
			var userIdList = getOwnerIds(robots);
			return [
				robots,
				RobotData.find(),
				Meteor.users.find({_id: {$in: userIdList}})
			]
		}
	}
});

// sucht zu einem Cursor von Robotern die Ids aller Besitzer heraus
function getOwnerIds(robots){
	// User denen die Roboter gehören
	var userIdList = [];
	robots.forEach(function (robot) {
		// Füge die UserId nur hinzu, wenn sie nicht bereits in der Liste ist
		if(userIdList.indexOf(robot.belongsTo) == -1){
			userIdList.push(robot.belongsTo);
		}
	});
	return userIdList;
}