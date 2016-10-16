// Dokumente publishen
Meteor.publish('documents', function(){
	// Wenn der user eingeloggt ist kann er alle Roboter sehen
	if(this.userId){
		// alle Dokumente
		return [
			Documents.find(),
			DocumentData.find(),
		]

	}
});