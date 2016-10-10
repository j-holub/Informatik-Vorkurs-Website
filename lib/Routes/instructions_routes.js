Router.route('/instructions', {
	name: 'instructions',
	template: 'instructions',
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


// # OSX #

Router.route('/instructions/osx', {
	name: 'osx',
	template: 'osxChoice',
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

Router.route('/instructions/osx/install', {
	name: 'osxInstall',
	template: 'osxInstall',
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

Router.route('/instructions/osx/eclipse', {
	name: 'osxEclipse',
	template: 'osxEclipse',
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


// # Linux #

Router.route('/instructions/linux', {
	name: 'linux',
	template: 'linuxChoice',
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

Router.route('/instructions/linux/install', {
	name: 'linuxInstall',
	template: 'linuxInstall',
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

Router.route('/instructions/linux/eclipse', {
	name: 'linuxEclipse',
	template: 'linuxEclipse',
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