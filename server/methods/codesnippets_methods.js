Meteor.methods({
	'addSnippet': function(name, content, comment){
		// check ob User eingeloggt
		if(Meteor.userId()){
			// Snippet hinzufügen
			var data = {
				'name': name,
				'snippet': content,
				'comment': comment
			}
			return CodeSnippets.insert(data);
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
	'deleteSnippet': function(id){
		// check ob User eingeloggt
		if(Meteor.userId()){
			return CodeSnippets.remove(id);
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	}
});