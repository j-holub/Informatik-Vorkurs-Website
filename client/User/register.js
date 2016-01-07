
Template.register.events({
	// Registriert einen neuen Benutzer
	'submit form': function (event) {
		// Verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Die Input Fields abfragen
		email = $('.register [name=email]').val();
		password = $('.register [name=password]').val();
		firstname = $('.register [name=firstname]').val();
		lastname = $('.register [name=lastname]').val();
		// Den User anlegen
		Accounts.createUser({
			email: email,
			password: password,
			profile: {
				firstname: firstname,
				lastname: lastname,
			} 
		}, function (error) {
			if (error) {
				Meteor.customFunctions.errorToast(error.reason);
			}
			else{
				Router.go('profile', {_id: Meteor.userId()});
			}
		});
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