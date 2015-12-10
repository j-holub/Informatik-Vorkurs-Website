
// Dies definiert das Haupttemplate, es wird auf jeder Seite gerendert
Router.configure({
	layoutTemplate: 'main'
});

//Die Landing Page
Router.route('/', {
	name: 'landingPage',
	template: 'landingPage'
});
