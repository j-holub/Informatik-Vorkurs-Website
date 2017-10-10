Template.groups.helpers({
	// returns list of groups, grouped by their creators creation date
	listGroups: function () {
		let groups = Groups.find({}, {sort: {'name': 1}}).fetch();

		let yearGroups = _.map(_.groupBy(groups, group => Meteor.users.findOne({_id: group.creator}).profile.year), (val, key) => [parseInt(key), val]);

		return _.sortBy(yearGroups, group => -group[0]);
	},
	memberCount: function () {
		return this.members.length;
	}
});


Template.createGroupModal.events({
	'submit form': function (event) {
		// Verhindert, dass das Formular abgeschickt, und die Seite neu geladen wird
		event.preventDefault();
		// Die Input Fields abfragen
		var name  = $('[name=groupName]').val();
		Meteor.call('createGroup', name, function (error, result) {
			if(error){
				Meteor.customFunctions.errorToast(error.reason);
			}
			else{
				// Input Felder leeren
				$('#createGroup')[0].reset();
				// Modal unsichtbar machen
				$('#createGroupModal').removeClass('active');
				// Gruppenseite öffnen
				Router.go('group', {_id: result});
			}
		});
	},
	'click #createGroupButton': function(event){
		$('#createGroupModal').addClass('active');
	},
	'click .modalClose': function(){
		// Form resetten
		$('#createGroup')[0].reset();
		// Modal unsichtbar machen
		$('#createGroupModal').removeClass('active');
	},
	'click .modalBackground': function(event){
		// verhindert das schließen durch das klicken auf das Modal selbst
		if(!(event.target != $('.modalBackground')[0])){
			// Form resetten
			$('#createGroup')[0].reset();
			// Modal unsichtbar machen
			$('#createGroupModal').removeClass('active');
		}
	}
});
