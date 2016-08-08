Template.groupdetail.helpers({
	listMembers: function () {
		return Meteor.users.find({_id: {$in: this.members}});
	},
	getMainbot: function() {
		if(this.mainbot){
			return Robots.findOne(this.mainbot);
			
		}
	},
	memberBots: function() {
		return Robots.find({'belongsTo': {$in: this.members}});
	},
	isCreator: function() {
		return this.creator === Meteor.userId();
	},
	// wird in einem {{#with getMainbot}} Kontext aufgerufen,
	// daher referenziert this einen Roboter
	mainBotDownloadable: function() {
		return this.downloadable;
	},
	// wird in einem {{#with getMainbot}} Kontext aufgerufen,
	// daher referenziert this einen Roboter
	downloadUrl: function () {
		return RobotData.findOne(this.data).url({'download': true});
	}
});

Template.groupdetail.events({
	'click #addUserToGroupIcon': function () {
		$('#addUserToGroupModal').addClass('active');
		if(Meteor.Device.isDesktop()){
			$('[name=searchUsers]').focus();
		}
	}
});


Template.groupdetail.onRendered(function() {

	$('#groupname').fitText(1.5, {
		maxFontSize: '50em'
	});

	$('.subheading').fitText(1.8, {
		maxFontSize: '50em'
	});

});

Template.addUserToGroupModal.helpers({
	searchResult: function () {

		// Data durch die SeaerchSource bekommen
		var data = UserSearch.getData({
			transform: function(matchText, regExp){
				return matchText.replace(regExp, "<b>$&</b>")
			},
			sort: {'profile.firstname': 1}
		});

		return data;
	},
	// wird immer im Kontext eines Users aufgerufen (this referenziert den User)
	isMember: function () {
		// GruppenID holen
		var groupId = $('#Result').data('group-id');
		var group = Groups.findOne(groupId);
		return ($.inArray(this._id, group.members) != -1);
	}
});

Template.addUserToGroupModal.events({
	'click .modalClose': function(){
		// Modal schließen
		$('#addUserToGroupModal').removeClass('active');
		// Input leeren
		$('[name=searchUsers]').val('');
	},
	'click .modalBackground': function(event) {
		if(!(event.target != $('.modalBackground')[0])){
			// Modal schließen
			$('#addUserToGroupModal').removeClass('active');
			// Input leeren
			$('[name=searchUsers]').val('');
		}
	},
	'click #Done': function() {
		// Modal schließen
		$('#addUserToGroupModal').removeClass('active');
		// Input leeren
		$('[name=searchUsers]').val('');
	},
	'keyup [name=searchUsers]': _.throttle(function(event) {
		event.preventDefault();
		var searchText = $('[name=searchUsers]').val();
		UserSearch.search(searchText);
	}, 200),
	// wird immer im Kontext eines Users aufgerufen (this referenziert den User)
	'click .username': function(event) {
		// GruppenID holen
		var groupId = $('#Result').data('group-id');
		// User in die Gruppe hinzufügen
		Meteor.call('addUserToGroup', groupId, this._id, function(error, result) {
			if(error){
				Meteor.customFunctions.errorToast(error.reason);
			}
			else{
				// Input leeren
				$('[name=searchUsers]').val('');
				// Focus setzen
				$('[name=searchUsers]').focus();
				// Results resetten
				UserSearch.search('');
			}
		});
	}
});