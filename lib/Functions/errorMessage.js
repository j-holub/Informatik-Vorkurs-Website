Meteor.customFunctions = {
	errorToast: function(message){
		toastr.error(Meteor.customFunctions.translateMessage(message));
	},
	translateMessage: function(message){
		if(message in translations){
			return translations[message];
		}
		else{
			return message;
		}
	}
}

var translations = {
	"Password may not be empty": "Bitte Passwort angeben",
	"Incorrect Password": "Passwort falsch",
	"Match failed": "Passwort oder Email falsch",
	"User not found": "Nutzer nicht registriert",
	"Email already exists": "Email Adresse ist bereits registriert",
	"FS.Collection insert: file does not pass collection filters": "Datei ist keine 'jar' Datei"
};