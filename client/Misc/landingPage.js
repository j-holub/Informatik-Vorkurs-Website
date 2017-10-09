Template.landingPage.onRendered(function(){
	// viewport Höhe holen
	var viewportHeight = $(window).height();

	if(Meteor.Device.isDesktop()){

		// stripe Bereich anpassen
		$('#stripe').css('min-height', 0.2 * viewportHeight);
		$('#stripe .verticalCenter').css('height', 0.2 * viewportHeight);

	}

	// FlowTypeJS
	$('#information').flowtype({
		minFont: 14,
		maxFont: 22
	});

	$('#robocode').flowtype({
		minFont: 14,
		maxFont: 22
	});

	$('#stripe .content').flowtype({
		minFont: 14,
		maxFont: 22,
	});

	// FitTextJS
	$('h1').fitText(1.7);


});

Template.landingPage.events({
	'click #downArrow i': function (event) {
		$(window).scrollTo('#information', 800);
	},
	'click #loginButton': function(event) {
		// $(window).scrollTo('#loginRegisterArea', 800);
		$('#LoginModal').addClass('active');
		if(Meteor.Device.isDesktop()){
			$('.login [name=email]').focus();
		}
	},
	'click #LoginModal .modalClose': function() {
		$('#LoginModal').removeClass('active');
		$('#login')[0].reset();
	},
	'click .modalBackground': function(event) {
		if(!(event.target != $('.modalBackground')[0])){
			$('#LoginModal').removeClass('active');
			$('#login')[0].reset();
		}
	},
	'click #registerButton': function(event) {
		$(window).scrollTo('#loginRegisterArea', 800);
		if(Meteor.Device.isDesktop()){
			$('.register [name=email]').focus();
		}
	}
});
