
// Dies definiert das Haupttemplate, es wird auf jeder Seite gerendert
Router.configure({
	layoutTemplate: 'main'
})

//Die Landing Page
Router.route('/', {
	name: 'landing Page',
	template: 'landingPage'
});

// Diese Seite listet alle verfügbaren Robots auf
Router.route('/robots', {
	name: 'robots',
	template: 'robots'
});

// Listet alle verfügbaren User auf
Router.route('/users', {
	name: 'users',
	template: 'users'
})

//User profile page
Router.route('/users/:_id', {
	name: 'profile',
	template: 'profile',
	data: function(){
		var currentUserId = this.params._id;
		return Meteor.users.findOne({_id: currentUserId});
	}
})

//Die Register Seite
Router.route('/register', {
	name: 'register',
	template: 'register'
})

