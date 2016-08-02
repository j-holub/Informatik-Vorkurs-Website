// Gruppen Schema

Groups = new Mongo.Collection('groups');

GroupSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Gruppenname"
	},
	creator: {
		type: String,
		label: "Gruppenersteller"
	},
	// IDs der Gruppenmitglieder
	members: {
		type: [String],
		label: "Gruppenmitglieder"
	},
	// ID des Bots der als Hauptbot gewählt wurde
	mainbot: {
		type: String,
		label: "Hauptroboter",
		optional: true
	}
});

Groups.attachSchema(GroupSchema);