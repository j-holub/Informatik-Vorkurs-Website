Template.codesnippets.helpers({
	listSnippets: function () {
		return CodeSnippets.find();
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

		Meteor.call('addSnippet', name, content, function(error){
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