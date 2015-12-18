
Template.navigation.events({
	// Öffnet das Menü
	'click #menuButton': function (event) {
		event.preventDefault();
		$('#navi').toggleClass('collapsed');
		$('#menuButton').toggleClass('active');
	},
	// Schließt das Menü bei drücken eines Links
	'click #navi a': function(event){
		if($('#menuButton').hasClass('active') && !$('#navi').hasClass('collapsed')){
			$('#menuButton').removeClass('active');
			$('#navi').addClass('collapsed');
		}
	}
});