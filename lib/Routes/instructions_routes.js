Router.route('material/instructions', {
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

Router.route('material/instructions/osx', {
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

Router.route('material/instructions/osx/install', {
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

Router.route('material/instructions/osx/eclipse', {
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

Router.route('material/instructions/linux', {
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

Router.route('material/instructions/linux/install', {
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

Router.route('material/instructions/linux/eclipse', {
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



// # Windows #

Router.route('material/instructions/windows', {
	name: 'windows',
	template: 'windowsChoice',
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

Router.route('material/instructions/windows/install', {
	name: 'windowsInstall',
	template: 'windowsInstall',
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

Router.route('material/instructions/windows/eclipse', {
	name: 'windowsEclipse',
	template: 'windowsEclipse',
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