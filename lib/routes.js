
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

//Die Register Seite
Router.route('/register', {
	name: 'register',
	template: 'register'
})

