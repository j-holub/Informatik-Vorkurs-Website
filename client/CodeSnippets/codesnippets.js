Template.codesnippets.helpers({
	listSnippets: function () {
		return CodeSnippets.find({}, {sort: {'name': 1}});
	},
	linesOfCode: function() {
		var number = (this.snippet.match(/\n/g) || []).length + 1;
		switch(number){
			case 1: 
				return "<i class=\"mdi mdi-numeric-1-box-outline\"></i>";
				break;
			case 2: 
				return "<i class=\"mdi mdi-numeric-2-box-outline\"></i>";
				break;
			case 3: 
				return "<i class=\"mdi mdi-numeric-3-box-outline\"></i>";
				break;
			case 4: 
				return "<i class=\"mdi mdi-numeric-4-box-outline\"></i>";
				break;
			case 5: 
				return "<i class=\"mdi mdi-numeric-5-box-outline\"></i>";
				break;
			case 6: 
				return "<i class=\"mdi mdi-numeric-6-box-outline\"></i>";
				break;
			case 7: 
				return "<i class=\"mdi mdi-numeric-7-box-outline\"></i>";
				break;
			case 8: 
				return "<i class=\"mdi mdi-numeric-8-box-outline\"></i>";
				break;
			case 9: 
				return "<i class=\"mdi mdi-numeric-9-box-outline\"></i>";
				break;
			default:
				return "<i class=\"mdi mdi-numeric-9-plus-box-outline\"></i>";
				break;
		}
	}
});

Template.codesnippets.events({
	'click .deleteSnippet': function () {
		// this referenziert die ID mit der das Template gerendert wurde
		Meteor.call('deleteSnippet', this._id, function(error){
			if(error){
				Meteor.customFunctions.errorToast(error.message);
			}
		});

	}
});

Template.codesnippets.onRendered(function(){
	$('h1').fitText(1.5, {
		maxFontSize: '50em'
	});
});

Template.snippet.onRendered(function(){
	// Code highlighten
	Prism.highlightAll();

	// FlowTypeJs
	$('.comment').flowtype({
		min: 500,
		max: 1200,
		maxFont: 20,
		minFont: 14
	});

	// FitTextJS
	$('h1').fitText(1.5, {
		maxFontSize: '50em'
	});
});

Template.snippet.helpers({
	restoreLinebreaks: function (text) {
		var linebreakText = text.replace(/(\r\n|\n|\r)/gm, '<br>')
		return linebreakText;
	}
});



Template.addSnippetModal.events({
	'click #openSnippetModalButton': function(){
		$('#snippetModal').addClass('active');
		if(Meteor.Device.isDesktop()){
			$('[name="snippetName"]').focus();
		}
	},
	'click .modalBackground': function (event){
		if(!(event.target != $('.modalBackground')[0])){
			// Modal verstecken
			$('#snippetModal').removeClass('active');
			// Form resetten
			$('#addSnippetForm')[0].reset();
			
		}
	},
	'click .modalClose': function(){
		// Modal verstecken
		$('#snippetModal').removeClass('active');
		// Form resetten
		$('#addSnippetForm')[0].reset();
	},
	'submit Form': function(event, template){
		// verhindert das neuladen der Seite durch das abschicken des forms
		event.preventDefault();

		// name
		var name = $('[name="snippetName"]').val();
		// snippet Inhalt
		var content = $('[name="snippetContent"]').val();
		// commentar holen
		var comment = $('[name="comment"]').val();

		Meteor.call('addSnippet', name, content, comment, function(error){
			if(error){
				Meteor.customFunctions.errorToast(error.message);
			}
			else{
				// Modal verstecken
				$('#snippetModal').removeClass('active');
				// form resetten
				$('#addSnippetForm')[0].reset();
			}
		});
	}
});