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
	},
	subscriptions: function(){
		return Meteor.subscribe('robots');
		alert("foo");
	}
});

