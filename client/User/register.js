
Template.register.events({
	'submit form': function (event) {
		// Verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Die Input Fields abfragen
		email = $('[name=email]').val();
		password = $('[name=password]').val();
		firstname = $('[name=firstname]').val();
		lastname = $('[name=lastname]').val();
		skype = $('[name=skype]').val();
		line = $('[name=line]').val();
		// Den User anlegen
		Accounts.createUser({
			email: email,
			password: password,
			profile: {
				firstname: firstname,
				lastname: lastname,
				skype: skype,
				line: line,
			} 
		}, function (error) {
			if (error) {
				console.log(error.reason);
			}
			else{
				Router.go('landing Page');
			}
		});
	}
});


Template.logout.events({
	'click [name=logout]': function (event) {
		Meteor.logout();
		Router.go("landing Page");
	}
});