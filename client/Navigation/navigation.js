
Template.navigation.events({
	'click #menuButton': function (event) {
		event.preventDefault();
		$('#navi').toggleClass('collapsed');
		$('#menuButton').toggleClass('active');
	}
});