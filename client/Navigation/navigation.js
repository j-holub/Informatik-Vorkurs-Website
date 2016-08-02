var closeMenu = function() {
	if($('#naviWrapper').hasClass('active')){
		$('#naviWrapper').removeClass('active');
	}
	if($('#menuButton').hasClass('active')){
		$('#menuButton').removeClass('active');
	}
	if($('#backgroundDarken').hasClass('active')){
		$('#backgroundDarken').removeClass('active');
	}
	$('body').css('overflow', 'auto');
}

Template.navigation.events({
	// Öffnet das Menü
	'click #menuButton': function (event) {
		event.preventDefault();
		$('#naviWrapper').toggleClass('active');
		$('#menuButton').toggleClass('active');
		// backgroundblur
		$('#backgroundDarken').toggleClass('active');
		// $('#naviWrapper').toggleClass()
		if($('body').css('overflow') != 'hidden'){
			$('body').css('overflow', 'hidden');	
		}
		else{
			$('body').css('overflow', 'auto');		
		}
		
	},
	// Schließt das Menü bei drücken eines Links
	'click #navi li a': function(event){
		closeMenu();
	},
	// Schließt das Menü bei drücken des ausgergrauten Hintergrunds
	'click #backgroundDarken': function(event){
		closeMenu();
	},
	// Schließt das Menü beim klicken der Info Links oben rechts in der Navileiste
	'click #userInfo a': function(event) {
		closeMenu();
	}
});