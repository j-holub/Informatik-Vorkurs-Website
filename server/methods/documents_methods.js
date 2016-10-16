Meteor.methods({
	// fügt ein Dokument in die Datenbank ein
	'uploadDocument': function(name, uploadedDocumentFileId){
		// überprüfen ob aktuell ein User eingeloggt ist
		if(Meteor.userId()){
			// Felder validieren
			// Die check funktion beendet die Funktion bei einem Fehler
			// check(name, String);
			// Datensatz anlegen
			var data = {
				name: name,
				data: uploadedDocumentFileId
			};
			// Den Roboter in der Datenbank anlegen
			return Documents.insert(data);
		}
		// Fehler werfen
		else{
			throw new Meteor.Error("Nicht eingeloggt", "Du bist nicht eingeloggt");
		}
	},
});