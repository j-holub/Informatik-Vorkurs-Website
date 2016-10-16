// Verschiedene PDF Dokumente

Documents = new Mongo.Collection('documents');

DocumentSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Dokumenttitel"
	},
	data: {
		type: String,
		label: "Daten"
	}
});

Documents.attachSchema(DocumentSchema)

// ---- File Storage ----

// Document Data
DocumentData = new FS.Collection('documentData', {
	stores: [new FS.Store.FileSystem('documentData')],
	filter: {
		maxSize: 1024000, // 1MB
		allow: {
			extensions: ['pdf']
		},
		onInvalid: function(message){
      		// Es gibt einen Fehler der jedesmal vorkommt, dass er behauptet das Objekt hätte eine auslesbare Filesize
      		// trotzdem funktioniert irgendwie alles
      		console.log("Error when trying to insert a file into DocumentData");
      		console.log(message);
    	}
	}	
});
