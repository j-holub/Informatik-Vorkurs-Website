
// Dies definiert das Haupttemplate, es wird auf jeder Seite gerendert
Router.configure({
	layoutTemplate: 'main'
})

//Die Landing Page
Router.route('/', {
	name: 'landingPage',
	template: 'landingPage'
});

// Diese Seite listet alle verfügbaren Robots auf
Router.route('/robots', {
	name: 'robots',
	template: 'robots',
	onBeforeAction: function(){
		//Dies überprüft ob ein User eingeloggt ist
		if(Meteor.userId()){
			this.next();
		}
		else{
			this.redirect("landingPage");
		}
	}
});

// Listet alle verfügbaren User auf
Router.route('/users', {
	name: 'users',
	template: 'users',
	onBeforeAction: function(){
		//Dies überprüft ob ein User eingeloggt ist
		if(Meteor.userId()){
			this.next();
		}
		else{
			this.redirect("landingPage");
		}
	}
})

//User profile page
Router.route('/users/:_id', {
	name: 'profile',
	template: 'profile',
	data: function(){
		var currentUserId = this.params._id;
		return Meteor.users.findOne({_id: currentUserId});
	},
	onBeforeAction: function(){
		//Dies überprüft ob ein User eingeloggt ist
		if(Meteor.userId()){
			this.next();
		}
		else{
			this.redirect("landingPage");
		}
	}
})

// Die Register Seite
Router.route('/register', {
	name: 'register',
	template: 'register'
})

// Login Seite
Router.route('/login', {
	name: 'login',
	template: 'login'
})

//listet alle Turniere auf
Router.route('/tournaments', {
	name: 'tournaments',
	template: 'tournaments',
	onBeforeAction: function(){
		//Dies überprüft ob der User eingeloggt ist
		if(Meteor.userId()){
			this.next();
		}
		else{
			this.redirect("landingPage");
		}
	}
})

// Detail Seite zu einem Turnier
Router.route('/tournaments/:_id', {
	name: 'tournamentDetail',
	template: 'tournamentDetail',
	data: function(){
		var tournamentId = this.params._id;
		return Tournaments.findOne({_id: tournamentId});
	},
	onBeforeAction: function(){
		//Dies überprüft ob der User eingeloggt ist
		if(Meteor.userId()){
			this.next();
		}
		else{
			this.redirect("landingPage");
		}
	}
})

