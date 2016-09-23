Template.profile.helpers({
	isActiveUser: function(id){
		return (id == Meteor.userId());
	},
	hasRobots: function(id){
		return Robots.find({'belongsTo': id}).count() > 0;
	},
	// das ganze MUSS als reaktiver Helper gemacht werden, da onRendered nicht aufgerufen wird,
	// wenn man von einem anderen Profil auf sein eigenes Wechselt. Da dort das Template nicht 
	// neu gerendert, sondern nur die Daten verändert werden
	// Das ganze gibt es halt dann leider doppelt, aber muss erstmal so
	addDeleteProfilePicButton: function(){

		// FitTextJs
		$('h2').fitText(1.5);

		// ID des aktiven Nutzer
		// durch diesen Aufruf wird der Helper reaktiv
		var currentUser = Meteor.user();
		// ID des Users des Profils
		var userId = Template.currentData()._id;
		if(userId == currentUser._id){
			// Hoverklasse hinzufügen
			// console.log($('#userProfile .avatar i'));
			$('#userProfile .avatar').addClass('avatar-hover');
			if(Meteor.user().profile.profilePicData != null){
				var avatarBlock = $('#userProfile .avatar');
				var icon = "<i class=\"fa fa-times fa-3x\" id=\"deleteProfilePic\"></i>";
				avatarBlock.append(icon);
			}
			else{
				$('#deleteProfilePic').remove();
			}
		}
		else{
			$('#userProfile .avatar').removeClass('avatar-hover');
		}
	},
});



Template.profile.events({
	'change #profilePic': function (event) {
		// Holt die Datei aus dem File Form
		var file = event.target.files[0];
		// Das Bild hochladen
		var profilePic = ProfilePics.insert(file, function(error, fileObj){
			// wenn es ein Fehler gab diese Ausgeben
			if(error){
				Meteor.customFunctions.errorToast(error.message);
			}
			// wenn es keine Fehler gibt, muss das Bild noch mit dem User verlinkt werden
			else{
				Meteor.call('addProfilePicture', profilePic._id, function(error, resultId){
					if(error){
						Meteor.customFunctions.errorToast(error.message);
						// Bild löschen
						ProfilePics.remove(profilePic);
					}
					// wenn alles okay war muss das delete Icon noch hinzugefügt werden
					else{
						var avatarBlock = $('#userProfile .avatar');
						var icon = "<i class=\"fa fa-times fa-3x\" id=\"deleteProfilePic\"></i>";
						avatarBlock.append(icon);
					}
				});
			}
		});
	},
	'click #deleteProfilePic': function(event){
		Meteor.call('deleteProfilePicture', function (error, result) {
			if(error){
				Meteor.customFunctions.errorToast(error.message);
			}
			// wenn alles gut ging muss das delete Icon noch entfernt werden
			else{
				$('#deleteProfilePic').remove();
			}
		});
		// Verhindert, dass das label des Profilbildes auch geklickt wird
		return false;
	},
	// Blurred das Profilbild beim mousehover
	'mouseenter #userProfile .avatar-image': function(event){
		// Auf Mobilgeräten macht das Probleme
		if(Meteor.Device.isDesktop()){
			if(Template.currentData()._id == Meteor.userId()){
				// Die AnimationOptions sind im CSS nachgebaut
				var vague = $('#userProfile .avatar-image').Vague({
					intensity: 2,
					forceSVGURl: false,
				});
				vague.blur();
			}
		}
	},
	// Entfernt den Blureffekt
	'mouseleave #userProfile .avatar-image': function(event){
		// Auf Mobilgeräten macht das Probleme
		if(Meteor.Device.isDesktop()){
			// Die AnimationOptions sind im CSS nachgebaut
			var vague = $('#userProfile .avatar-image').Vague({
				intensity: 2,
				forceSVGURl: false,
			});
			vague.unblur();
		}
	}
});

// Fügt den Bild löschen Button in die UI ein. War leider nur so unschön möglich
// Dadurch, dass es ein Template ist wird es aber automatisch geupdatet.
// Fügt ebenfalls die hover klasse für das avatarbild hinzu um den blauen rand zu bekommen
Template.profile.onRendered(function () {
	// FitTextJs
	$('h2').fitText(1.5);

	var id = Template.currentData()._id;
	if(id == Meteor.userId()){
		// Hoverklasse hinzufügen
		$('#userProfile .avatar').addClass('avatar-hover');
		if(Meteor.user().profile.profilePicData != null){
			var avatarBlock = $('#userProfile .avatar');
			var icon = "<i class=\"fa fa-times fa-3x\" id=\"deleteProfilePic\"></i>";
			avatarBlock.append(icon);
		}
		else{
			$('#deleteProfilePic').remove();
		}
	}
	else{
		$('#userProfile .avatar').removeClass('avatar-hover');
	}
});