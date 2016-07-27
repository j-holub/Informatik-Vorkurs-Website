
CodeSnippets = new Mongo.Collection('codesnippets');

CodeSnippetsSchema = new SimpleSchema({
	name: {
		type: String,
		label: "CodeSnippet Titel"
	},
	snippet: {
		type: String,
		label: "CodeSnippet"
	},
	comment: {
		type: String,
		label: "Kommentar",
		optional: true
	}
});

CodeSnippets.attachSchema(CodeSnippetsSchema);