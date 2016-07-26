
CodeSnippets = new Mongo.Collection('codesnippets');

CodeSnippetsSchema = new SimpleSchema({
	name: {
		type: String,
		label: "CodeSnippet Titel"
	},
	snippet: {
		type: String,
		label: "CodeSnippet"
	}
});

CodeSnippets.attachSchema(CodeSnippetsSchema);