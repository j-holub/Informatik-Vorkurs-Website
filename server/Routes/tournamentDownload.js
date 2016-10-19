import AdmZip from 'adm-zip'
import fs from 'fs'

// packt alle Teilnehmer dieses Turniers in eine Zip und liefert sie als
// http response zurück zum client
Router.route('/tournaments/:_id/download', {
	name: 'tournamentDownload',
	template: 'downloadRobots',
	where: 'server',
	action: function(){

		// Das turnier holen
		var tournament = Tournaments.findOne({_id: this.params._id});

		// Ziparchiv erstellen
		var archive = new AdmZip();

		// Jeden Roboter in das Ziparchiv packen
		tournament.participants.forEach(function (participant) {
			var robot = Robots.findOne({_id: participant.robot});
			var data  = RobotData.findOne({_id: robot.data});

			var group = Groups.findOne({_id: participant.group});

			archive.addFile(`${group.name} - ${robot.name}.jar`, new Buffer(data.url()));
		});

		// Ein Buffer des Archivs erzeugen
		var zipBuffer = archive.toBuffer();

		// Header setzen
		var headers = {
			'Content-type': 'application/zip',
			'Content-Disposition': 'attachment; filename=' + `${tournament.name}.zip`
		}

		this.response.writeHead(200, headers);
		// das archiv mitschicken
		this.response.end(zipBuffer);
	}
});