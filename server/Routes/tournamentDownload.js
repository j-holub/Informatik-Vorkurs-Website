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

		// sollte der Ordner für die zips aus irgend einem Grund nicht existieren
		// einfach erstellen
		if(!fs.existsSync(`${process.env.PWD}/public/zips`)){
			fs.mkdirSync(`${process.env.PWD}/public/zips`);
		}

		// das zip archiv
		var archive = new AdmZip();
		var archiveName = `${tournament.name}.zip`

		// liste der Dateien um sie danach wieder zu löschen
		var fileList = new Array(tournament.participants.length);

		// jeder Roboter muss in sein ursprünglichen namen umbenannt und in das 
		// Zip archiv gepackt werden
		tournament.participants.forEach(function (participantId) {
			var robot = Robots.findOne({_id: participantId});
			var data  = RobotData.findOne({_id: robot.data});
			
			var filePath = `${process.env.PWD}/.meteor/local/cfs/files/robotData/${data.copies.robotData.key}`;


			var newFilePath = "";
			// überprüfuen ob ein Roboter mit dem selben Namen bereits vorhande ist
			if(fs.existsSync(`${process.env.PWD}/public/zips/${robot.name}.jar`)){
				// Uploader name heraussuchen
				var uploader = Meteor.users.findOne(robot.belongsTo);
				newFilePath = `${process.env.PWD}/public/zips/${robot.name}_${uploader.profile.firstname}-${uploader.profile.lastname}.jar`
			}
			else{
				newFilePath = `${process.env.PWD}/public/zips/${robot.name}.jar`;
			}

			// Datei in den public Ordner kopieren und umbennen
			fs.linkSync(filePath, newFilePath);
			archive.addLocalFile(newFilePath);

			// datei in der Liste speichern um sie wieder zu löschen
			fileList.push(newFilePath);

		});

		// das zip archiv auf die Platte schreiben
		archive.writeZip(`${process.env.PWD}/public/zips/${archiveName}`);

		// alle kopierten Dateien löschen
		fileList.forEach(function (robot) {
			fs.unlinkSync(robot);
		});

		// die Datei der HTTP response anhängen
		var zipData = fs.readFileSync(`${process.env.PWD}/public/zips/${archiveName}`);

		var headers = {
			'Content-type': 'application/octet-stream',
			'Content-Disposition': 'attachment; filename=' + `${archiveName}`
		}

		this.response.writeHead(200, headers);
		this.response.end(zipData);
	},
	// löscht die zip am Ende wieder
	onAfterAction: function(){
		var tournament = Tournaments.findOne({_id: this.params._id});
		if(fs.existsSync(`${process.env.PWD}/public/zips/${tournament.name}.zip`)){
			fs.unlinkSync(`${process.env.PWD}/public/zips/${tournament.name}.zip`);
		}
	}
});