//listet alle Turniere auf
Router.route('/tournaments', {
	name: 'tournaments',
	template: 'tournaments',
	loadingTemplate: 'loading',
	onBeforeAction: function(){
		//Dies überprüft ob der User eingeloggt ist
		if(Meteor.userId()){
			this.next();
		}
		else{
			this.redirect("landingPage");
		}
	},
	subscriptions: function(){
		return Meteor.subscribe('tournaments');
	}
});

// Detail Seite zu einem Turnier
Router.route('/tournaments/:_id', {
	name: 'tournamentDetail',
	template: 'tournamentDetail',
	loadingTemplate: 'loading',
	data: function(){
		var tournamentId = this.params._id;
		return Tournaments.findOne({_id: tournamentId});
	},
	onBeforeAction: function(){
		// Dies überprüft ob der User eingeloggt ist
		if(Meteor.userId()){
			this.next();
		}
		else{
			this.redirect("landingPage");
		}
	},
	subscriptions: function(){
		return [Meteor.subscribe('robots'), Meteor.subscribe('tournaments', this.params._id)];
	}
});