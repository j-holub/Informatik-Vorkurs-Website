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

Router.route('/codesnippets/:_id', {
	name: 'snippet',
	template: 'snippet',
	data: function(){
		var snippetId = this.params._id;
		return CodeSnippets.findOne({_id: snippetId});
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
		return Meteor.subscribe('codesnippets', this.params._id);
	}
});