
Template.register.events({
	// Registriert einen neuen Benutzer
	'submit form': function (event) {
		// Verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Die Input Fields abfragen
		var email = $('.register [name=email]').val();
		var password = $('.register [name=password]').val();
		var passwordRepeat = $('.register [name=passwordrepeat]').val();
		var firstname = $('.register [name=firstname]').val();
		var lastname = $('.register [name=lastname]').val();

		var year = new Date().getFullYear();

		// Passwörter vergleichen
		if(password === passwordRepeat){
			// Den User anlegen
			Meteor.call('registerUser', {
				email: email,
				password: password,
				profile: {
					firstname: firstname,
					lastname: lastname,
					year: year
				}
				// wenn kein Fehler vorliegt User einloggen
				}, function (error, userId){
					if (error) {
						Meteor.customFunctions.errorToast(error.reason);
					}
					else{
						// user einlogen
						Meteor.loginWithPassword(email, password, function(error){
							if(!error){
								// auf die Profilseite verlinken
								Router.go('profile', {_id: userId});
							}
						});
					}
			});
	
		}
		// Passwörter nicht gleich
		else{
			Meteor.customFunctions.errorToast("Passwörter stimmen nicht überein");
		}
	}
});


Template.login.events({
	'submit form': function (event) {
		// Verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		//Die Input Fields abfragen
		email = $('.login [name=email]').val();
		password = $('.login [name=password]').val();
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				Meteor.customFunctions.errorToast(error.reason);
			}
			else{
				Router.go('profile', {_id: Meteor.userId()});
			}
		});
	}
});


Template.logout.events({
	'click [name=logout]': function (event) {
		Meteor.logout();
		Router.go("landingPage");
	}
});