Template.landingPage.onRendered(function(){
	// viewport Höhe holen
	var viewportHeight = $(window).height();
	// landingpage Bild auf diese Höhe setzen
	$('#landingPageImage').css('height', viewportHeight);
	$('.verticalCenter').css('height', viewportHeight);

	// Pfeil setzten
	$('#downArrow').css('top', 0.85 * viewportHeight);

	// größe der bereiche setzen
	$('section').css('min-height', 0.8 * viewportHeight);
});

Template.landingPage.events({
	'click #downArrow i': function (event) {
		$(window).scrollTo('#information', 800);
	},
	'click #loginButton': function(event) {
		$(window).scrollTo('#loginRegisterArea', 800);
		$('.login [name=email]').focus();
	},
	'click #registerButton': function(event) {
		$(window).scrollTo('#loginRegisterArea', 800);
		$('.register [name=email]').focus();
	}
});