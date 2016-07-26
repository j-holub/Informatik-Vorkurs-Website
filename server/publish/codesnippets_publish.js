// publisht alle Code Snippets
Meteor.publish('codesnippets', function(){
	if(this.userId){
		return CodeSnippets.find();
	}
});