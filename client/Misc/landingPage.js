Template.landingPage.onRendered(function(){
	// viewport Höhe holen
	var viewportHeight = $(window).height();
	// landingpage Bild auf diese Höhe setzen
	$('#landingPageImage').css('height', viewportHeight);
	$('#landingPageImage .verticalCenter').css('height', viewportHeight);

	// Pfeil setzten
	$('#downArrow').css('top', 0.85 * viewportHeight);

	

	if(Meteor.Device.isDesktop()){
		// größe der bereiche setzen
		$('section').css('min-height', 0.8 * viewportHeight);

		// stripe bereich gesondert anpassen
		$('#stripe').css('min-height', 0.4 * viewportHeight);
		$('#stripe .verticalCenter').css('height', 0.4 * viewportHeight);
			
	}

	// FlowTypeJS 
	$('#information').flowtype({
		minimum: 500,
		maximum: 1200,
		maxFont: 30
	});

	$('#robocode').flowtype({
		minimum: 500,
		maximum: 1200,
		maxFont: 30
	});

	$('#stripe .content').flowtype({
		minimum: 400,
		maximum: 1200,
	});

	// FitTextJS
	$('h1').fitText();
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