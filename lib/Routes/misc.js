
// Dies definiert das Haupttemplate, es wird auf jeder Seite gerendert
Router.configure({
	layoutTemplate: 'main'
});

//Die Landing Page
Router.route('/', {
	name: 'landingPage',
	template: 'landingPage',
	onBeforeAction: function(){
		// Wenn der user eingeloggt ist schick ihn dahin, wo er he
		if(Meteor.userId()){
			this.redirect('users');
		}
		else{
			this.next();
		}
	}
});

// Impressum
Router.route('/impressum', {
	name: 'impressum',
	template: 'Impressum'
});
