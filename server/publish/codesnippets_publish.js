// publisht alle Code Snippets
Meteor.publish('codesnippets', function(snippetId){
	if(this.userId){
		// spezielles snippet
		if(snippetId){
			return CodeSnippets.find({
				_id: snippetId
			});
		}
		// alle snippets
		else{
			return CodeSnippets.find();
		}
	}
});
