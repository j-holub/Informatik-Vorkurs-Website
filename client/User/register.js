
Template.register.events({
	'submit form': function (event) {
		// Verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		email = $('[name=email]').val();
		password = $('[name=password]').val();
		firstname = $('[name=firstname]');
		lastname = $('[name=lastname]');
		skype = $('[name=skype]').val();
		line = $('[name=line]').val();
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