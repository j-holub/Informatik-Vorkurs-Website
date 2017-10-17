Template.documents.helpers({
	listDocuments: function () {
		return Documents.find({}, {sort: {name: 1}});
	}
});

Template.document.helpers({
	downloadUrl: function(){
		var documentFile = DocumentData.findOne({_id: this.data});
		if(documentFile){
			return documentFile.url();
		}
	},
});

Template.document.events({
	'click [name=deleteDocument]': function (event) {
		// this._id referenziert die ID des Objeckts mit dem das Template gerendert wurde
		var documentToDelete = Documents.findOne({_id: this._id});
		var documentId = documentToDelete._id;
		// Daten löschen
		var deletedDocument = RobotData.remove({_id: documentToDelete.data}, function(error, file){
			if(error){
				console.log(error.reason);
			}
			else{
				// Den Roboter selbst löschen
				Meteor.call('deleteDocument', documentId, function (error, result) {
					if(error){
						// Ist das löschen in der DB fehlgschlagen fügen wir die Daten auch wieder hinzu
						DocumentData.insert(deletedDocument);
						console.log(error.reason);
					}
				});
			}
		});
	}
});


Template.uploadDocument.events({
	// Handelt das Upload Formular um einen Dokument hochzuladen
	'submit form': function (event, template) {
		// verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Daten sammeln
		let name = $('[name=documentName]').val();
		let documentFile = template.find('input:file').files[0];
		// schauen ob überhaupt eine Datei angehangen wurden
		if($('[name=documentData]').val() == ''){
			Meteor.customFunctions.errorToast("Keine Roboterdatei gefunden");
		}
		// Falls eine Datei exisitiert geht es weiter
		else{
			let currentUserId = Meteor.userId();
			// Document Data hochladen
			let uploadedDocument = DocumentData.insert(documentFile, function(error, fileObj){
				console.log(uploadedDocument);
				// Überprüfung ob es fehler gab
				if(error){
					Meteor.customFunctions.errorToast(error.message);

				}
				// wenn nicht das Dokument anlegen
				else{

					// Roboter in die Datenbank eintragen
					Meteor.call('uploadDocument', name, uploadedDocument._id, function(error, resultId){
						if(error){
							// löscht die Daten für den Fall, dass das eintragen des Roboters in die Datenbank fehlgeschlagen ist
							Meteor.customFunctions.errorToast(error.reason);
							DocumentData.remove(uploadedDocument);
						}
						// In diesem Fall ging alles gut und das Form wird resettet
						else{
							// Uploadform resetten
							$('#uploadDocument')[0].reset();
							// Standarttext auf den File Upload Button setzten
							$('#documentData').next('label').children('span').html('Datei');
							// Modal schließen
							$('#documentModal').removeClass('active');
						}
					});
				}
			});
		}
	},
	// zeigt den Dateinamen auf dem Button an
	'change #documentData': function(event){
		// Datei namen von dem event holen
		var fileName = event.target.value.split('\\').pop();
		var label = $('#documentData').next('label');
		var originalLabelValue = label.val();

		if(fileName){
			// Label auf den Dateinamen setzten
			label.find('span').html(fileName);
		}
		else{
			// auf den Originalen Text setzen
			label.html(originalLabelValue);
		}
	},
	'click #uploadDocumentButton': function(){
		$('#documentModal').addClass('active');
		// wenn Desktop sofort die eingabe fokusieren
		if(Meteor.Device.isDesktop()){
			$('[name=documentName]').focus();
		}
	},
	'click .modalClose': function(){
		$('#documentModal').removeClass('active');
		// Uploadform resetten
		$('#uploadDocument')[0].reset();
		// Standarttext auf den File Upload Button setzten
		$('#documentData').next('label').children('span').html('Datei');
	},
	'click .modalBackground': function(event) {
		if(!(event.target != $('.modalBackground')[0])){
			$('#documentModal').removeClass('active');
			// Uploadform resetten
			$('#uploadDocument')[0].reset();
			// Standarttext auf den File Upload Button setzten
			$('#documentData').next('label').children('span').html('Datei');
		}
	}
});
