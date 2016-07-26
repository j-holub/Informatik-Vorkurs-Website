Router.route('/codesnippets', {
	name: 'codesnippets',
	template: 'codesnippets',
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
		return Meteor.subscribe('codesnippets');
	}
});