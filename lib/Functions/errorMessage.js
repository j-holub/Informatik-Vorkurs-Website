Meteor.customFunctions = {
	// schickt das Toast ab und berechnet dabei noch die Position dieses
	// gibt es eine Navigationsleiste, wird das Toast unterhalb dieser anzeiget, ansonsten ganz oben
	errorToast: function(message){
		toastr.error(Meteor.customFunctions.translateMessage(message));

		// Ist der User eingeloggt gibt es eine Navbar
		if(Meteor.userId()){
			// get viewport position
			var viewportPos = $(window).scrollTop();
			// get navigationheight
			var navHeight = $('nav').outerHeight();
			// offset berechnen und setzten
			var offset = 12 + navHeight - Math.min(navHeight, viewportPos);
			$('#toast-container').css({top: offset}); 
		}
		// Ist der User nicht eingeloggt, gibt es keine
		else{
			$('#toast-container').css({top: 12});
		}
	},
	translateMessage: function(message){
		// Schauen ob es für die Nachricht eine Übersetzung gibt
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
	"Incorrect password": "Passwort falsch",
	"Match failed": "Passwort oder Email falsch",
	"User not found": "Nutzer nicht registriert",
	"Email already exists": "Email Adresse ist bereits registriert",
	"FS.Collection insert: file does not pass collection filters": "Falsches Dateiformat"
};