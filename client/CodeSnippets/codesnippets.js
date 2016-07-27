Template.codesnippets.helpers({
	listSnippets: function () {
		return CodeSnippets.find({}, {sort: {'name': 1}});
	}
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
		$('#snippetModal').css('display', 'block');
		$('[name="snippetName"]').focus();
	},
	'click .modalBackground': function (event){
		if(!(event.target != $('.modalBackground')[0])){
			// Modal verstecken
			$('#snippetModal').css('display', 'none');	
			// Form resetten
			$('#addSnippetForm')[0].reset();
			
		}
	},
	'click .modalClose': function(){
		// Modal verstecken
		$('#snippetModal').css('display', 'none');
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
				$('#snippetModal').css('display', 'none');
				// form resetten
				$('#addSnippetForm')[0].reset();
			}
		});
	}
});