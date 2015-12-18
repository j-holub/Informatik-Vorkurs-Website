
Template.register.events({
	// Registriert einen neuen Benutzer
	'submit form': function (event) {
		// Verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Die Input Fields abfragen
		email = $('[name=email]').val();
		password = $('[name=password]').val();
		firstname = $('[name=firstname]').val();
		lastname = $('[name=lastname]').val();
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
				console.log(error.reason);
			}
			else{
				Router.go('profile', {_id: Meteor.userId()});
			}
		});
	}
});

Template.register.rendered = function(){
	// Direkt das erste Feld fokusieren
	$('[name=email]').focus();
}

Template.login.events({
	'submit form': function (event) {
		// Verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		//Die Input Fields abfragen
		email = $('[name=email]').val();
		password = $('[name=password]').val();
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				console.log(error.reason);
			}
			else{
				var currentRoute = Router.current().route.getName();
				if(currentRoute == 'login'){
					Router.go('profile', {_id: Meteor.userId()});
				}
			}
		});
	}
});

Template.login.rendered = function(){
	// Direkt das erste Feld fokuiseren
	$('[name=email]').focus();
}

Template.logout.events({
	'click [name=logout]': function (event) {
		Meteor.logout();
		Router.go("landingPage");
	}
});