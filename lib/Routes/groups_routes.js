// alle Gruppen
Router.route('/groups', {
	name: 'groups',
	template: 'groups',
	onBeforeAction: function(){
		//Dies überprüft ob ein User eingeloggt ist
		if(Meteor.userId()){
			this.next();
		}
		else{
			this.redirect("landingPage");
		}
	},
	subscriptions: function() {
		return Meteor.subscribe('groups');
	}
});

// spezielle Gruppe
Router.route('/groups/:_id', {
	name: 'group',
	template: 'groupdetail',
	data: function() {
		return Groups.findOne({_id: this.params._id});
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
	subscriptions: function() {
		return Meteor.subscribe('groups', this.params._id);
	}
});