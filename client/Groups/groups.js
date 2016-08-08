Template.groups.helpers({
	listGroups: function () {
		return Groups.find({}, {sort: {'name': 1}});
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
				$('#createGroupModal').css('display', 'none');
			}
		});
	},
	'click #createGroupButton': function(event){
		$('#createGroupModal').css('display', 'block');
	},
	'click .modalClose': function(){
		// Form resetten
		$('#createGroup')[0].reset();
		// Modal unsichtbar machen
		$('#createGroupModal').css('display', 'none');
	},
	'click .modalBackground': function(event){
		// verhindert das schließen durch das klicken auf das Modal selbst
		if(!(event.target != $('.modalBackground')[0])){
			// Form resetten
			$('#createGroup')[0].reset();
			// Modal unsichtbar machen
			$('#createGroupModal').css('display', 'none');
		}
	}
});