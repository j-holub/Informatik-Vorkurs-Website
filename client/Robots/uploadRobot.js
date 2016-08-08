Template.uploadRobot.events({
	// Handelt das Upload Formular um einen Roboter hochzuladen
	'submit form': function (event, template) {
		// verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Daten sammeln
		var name = $('[name=robotName]').val();
		var description = $('[name=robotDescription]').val();
		var robotFile = template.find('input:file').files[0];
		// schauen ob überhaupt eine Datei angehangen wurden
		if($('[name=robotData]').val() == ''){
			Meteor.customFunctions.errorToast("Keine Roboterdatei gefunden");
		}
		// Falls eine Datei exisitiert geht es weiter
		else{
			var currentUserId = Meteor.userId();
			// Robot Data hochladen
			var uploadedRobot = RobotData.insert(robotFile, function(error, fileObj){
				// Überprüfung ob es fehler gab
				if(error){
					Meteor.customFunctions.errorToast(error.message);
				}
				// wenn nicht den Roboter anlegen
				else{
					// Roboter in die Datenbank eintragen
					Meteor.call('uploadRobot', name, description, uploadedRobot._id, function(error, resultId){
						if(error){
							// löscht die Daten für den Fall, dass das eintragen des Roboters in die Datenbank fehlgeschlagen ist
							Meteor.customFunctions.errorToast(error.reason);
							RobotData.remove(uploadedRobot);
						}
						// In diesem Fall ging alles gut und das Form wird resettet
						else{
							// Uploadform resetten
							$('#uploadRobot')[0].reset();
							// Standarttext auf den File Upload Button setzten
							$('#robotData').next('label').children('span').html('Datei');
							// Modal schließen
							$('#testModal').removeClass('active');
						}
					});
				}
			});
		}
	},
	// zeigt den Dateinamen auf dem Button an
	'change #robotData': function(event){
		// Datei namen von dem event holen
		var fileName = event.target.value.split('\\').pop();
		var label = $('#robotData').next('label');
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
	'click #uploadRobotButton': function(){
		$('#testModal').addClass('active');
		// wenn Desktop sofort die eingabe fokusieren
		if(Meteor.Device.isDesktop()){
			$('[name=robotName]').focus();
		}
	},
	'click .modalClose': function(){
		$('#testModal').removeClass('active');
		// Uploadform resetten
		$('#uploadRobot')[0].reset();
		// Standarttext auf den File Upload Button setzten
		$('#robotData').next('label').children('span').html('Datei');
	},
	'click .modalBackground': function(event) {
		if(!(event.target != $('.modalBackground')[0])){
			$('#testModal').removeClass('active');
			// Uploadform resetten
			$('#uploadRobot')[0].reset();
			// Standarttext auf den File Upload Button setzten
			$('#robotData').next('label').children('span').html('Datei');
		}
	}
});