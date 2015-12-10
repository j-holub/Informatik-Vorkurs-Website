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
	},
	subscriptions: function(){
		return Meteor.subscribe('users');
	}
});

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
	},
	subscriptions: function(){
		return [Meteor.subscribe('robots', this.params._id), Meteor.subscribe('users', this.params._id)];
	}
});

// Die Register Seite
Router.route('/register', {
	name: 'register',
	template: 'register'
});

// Login Seite
Router.route('/login', {
	name: 'login',
	template: 'login'
});