Template.tournamentParticipants.helpers({
	particpatingRobots: function () {
		var participantIds = Tournaments.findOne({_id: this._id}).participants;
		var robots = Robots.find({_id: {$in: participantIds}}, {sort: {name: 1}}).fetch();

		var formattedResultList;
		if(robots.length > 3){

			// Rückgabeliste basteln
			formattedResultList = new Array(Math.ceil(robots.length / 3));
			
			// neues Array in jedem eintrag erstellen
			for (var i  = 0; i  < formattedResultList.length; i++) {
				formattedResultList[i] = [];
			};

			// Die Suchergebnisse entsprechend einsortieren
			for (var i = 0; i < robots.length; i++) {
				formattedResultList[Math.floor(i/3)][i % 3] = robots[i];
			};

		}
		else{
			formattedResultList = new Array(1);
			formattedResultList[0] = robots;
		}

		// an den Client liefern
		return formattedResultList;

	}
});

Template.tournamentDetail.helpers({
	userHasRobotInTournament: function () {
		// Roboter des Users
		var userRobots = Robots.find({belongsTo: Meteor.userId()}).fetch();
		// Roboter im Turnier
		var robotsInTournament = Tournaments.findOne({_id: this._id}).participants;
		var userHasRobotInTournament = false;
		// Checke für jeden Roboter ob er im Turnier ist
		userRobots.forEach(function (robot) {
			if($.inArray(robot._id, robotsInTournament) > -1){
				userHasRobotInTournament = true;
			}
		});
		return userHasRobotInTournament;
	},
	// Erzeugt einen schöner formatierten Datum String aus dem Date Object des Turniers
	displayDate: function () {
		var date = this.date;
		var days = (date.getDate() <= 9 ? '0' : '') + date.getDate();
		var month = (date.getMonth() <= 9 ? '0' : '') + date.getMonth();
		var dateString = days+ "." + month + "." + date.getFullYear();
		return dateString;
	},
	// Gibt die anzahl der Teilnehmer aus
	paticipantCount: function(){
		var participantlist = Tournaments.findOne({_id: this._id}).participants;
		if(participantlist){
			return participantlist.length;
		}
		else{
			return 0;
		}
	},
	// Gibt an ob es überhaupt teilnehmer gibt
	hasParticipants: function(){
		return Tournaments.findOne({_id: this._id}).participants;
	},
	// checkt ob ein Turnier schon vorbei ist
	ended: function() {
		return this.date < new Date();
	},
	userHasRobots: function(){
		var userRobots = Robots.find({belongsTo: Meteor.userId()}).fetch();
		return userRobots.length > 0;
	}
});

Template.tournamentDetail.onRendered(function(){
	// FitTextJS
	$('h1').fitText(1.5, {
		maxFontSize: '50em'
	});
});


Template.tournamentEntry.helpers({
	listUserRobots: function () {
		var currentUserId = Meteor.userId();
		return Robots.find({belongsTo: currentUserId}, {sort: {name: 1}});
	},
	userHasGroup: function () {		
		return Groups.find({members: Meteor.userId()}).count() > 0;

	},
	userGroupHasMainbot: function () {
		var usergroup = Groups.findOne({members: Meteor.userId()});
		if(usergroup && usergroup.mainbot){
			return true;
		}
		else{
			return false;
		}
	},
	mainbotName: function() {
		var group = Groups.findOne({members: Meteor.userId()});
		if(group && group.mainbot){
			return Robots.findOne(group.mainbot).name;
		}
	}
});

Template.tournamentEntry.events({
	'click #signUpButton': function(event){
		var robotId;
		// durch alle Roboter iterieren
		$('li.robot').each(function(robot){
			// Schauen ob ein Roboter ausgewählt ist
			if($(this).hasClass('active')){
				robotId = $(this).data('id');
			}
		});
		// schauen ob wer ausgewählt wurde
		if(robotId){
			Meteor.call('signUpRobot', this._id, robotId, function (error, result) {
				if(error){
					console.log(error.reason);
				}
				else{
					// Modal schließen
					$('#robotEntryModal').css('display', 'none');
					// alle Roboter unmarkieren
					$('li.robot').each(function (robot){
						$(this).removeClass('active');
					});
				}
			});
		}
	},
	'click #tournamentEntryButton': function(event){
		$('#robotEntryModal').addClass('active');
	},
	// Modal schließen
	'click .modalClose': function(){
		$('#robotEntryModal').removeClass('active');
		// alle Roboter unmarkieren
		$('li.robot').each(function (robot){
			$(this).removeClass('active');
		});
	},
	// Modal schließen
	'click .modalBackground': function(event){
		if(!(event.target != $('.modalBackground')[0])){
			$('#robotEntryModal').removeClass('active');
			// alle Roboter unmarkieren
			$('li.robot').each(function (robot){
				$(this).removeClass('active');
			});
		}
	},
	// wählt ein Roboter im Modal aus
	'click li.robot': function(event){
		console.log(event.target);
		$('li.robot').each(function (robot){
			if($(this).data('id') == $(event.target).data('id')){
				$(event.target).addClass('active');
			}
			else{	
				$(this).removeClass('active');
			}
		});
	},
	// 'click #robotDropdown': function(event){
	// 	// Menü toggeln
	// 	$('#robotDropdown').toggleClass('active');
	// },
	// // Setzt den Text in das Feld des Dropdown Menüs
	// 'click #robotDropdown a': function(event){
	// 	// Auswahl abfragen
	// 	var newText = event.target.text;
	// 	$('#robotDropdown').find('span').text(newText);
	// 	// id aus der Auswahl abfragen
	// 	var robotId = $(event.target).data('id');
	// 	// Set the id into the robotDropdown div as a data attribute
	// 	$('#robotDropdown').data('id', robotId);
	// }
});


Template.tournamentRobot.helpers({
	// sucht zu einer UserId ddes Uploaders en Vor- und Nachnamen raus
	uploaderName: function (uploaderId) {
		var uploader = Meteor.users.findOne({_id: uploaderId});
		if(uploader){
			var name = uploader.profile.firstname + " " + uploader.profile.lastname;
			return name;
		}
	},
	belongsToUser: function(){
		// this._id referenziert die ID des Objeckts mit dem das Template gerendert wurde
		return Meteor.userId() == this.belongsTo;
	},
	// schaut ob das Turnier schon beendet wurde
	ended: function() {
		// TODO: ier eine sinnvollere Methode suchen
		var tournamentId = $('h1').data('id');
		var tournamentDate = Tournaments.findOne({_id: tournamentId}).date;
		return tournamentDate < new Date();
	}
});

Template.tournamentRobot.events({
	'click [name=signOutRobot]': function (event) {
		// TODO: hier eine bessere Methode suchen um an das richtige Turnier zu kommen
		var tournamentId = $('h1').data('id');
		// this._id referenziert den Roboter des Templates
		Meteor.call('signOutRobot', tournamentId, this._id, function (error, result) {
			if(error){
				console.log(error.reason);
			}
		});		
	},
});