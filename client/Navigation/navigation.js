
Template.navigation.events({
	'click #menuButton': function (event) {
		event.preventDefault();
		$('#navi').toggleClass('collapsed');
	}
});