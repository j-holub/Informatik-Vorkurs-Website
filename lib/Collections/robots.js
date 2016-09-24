// Roboter die von den Usern hochgeladen werden
Robots = new Mongo.Collection('robots');

RobotSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Robotername"
  },
  description: {
    type: String,
    label: "Roboterbeschreibung",
  },
  dateUploaded: {
    type: Date,
    label: "Erstellungsdatum",
    // Setzt das Datum automatisch auf jetzt
    autoValue: function(){
      if (this.isInsert){
        return new Date;
      }
    }
  },
  downloadable: {
    type: Boolean,
    label: "Downloadbarkeit",
    // Setzt die Downloadbarkeit automatisch auf wahr
    autoValue: function(){
      if(this.isInsert){
        return true;
      }
    }
  },
  belongsTo: {
    type: String,
    label: "UploaderId"
  },
  data: {
    type: String,
    label: "Daten",
  }
});

Robots.attachSchema(RobotSchema);


// ---- File Storage Collections ----

// RobotData
RobotData = new FS.Collection('robotData', {
  stores: [new FS.Store.FileSystem('robotData')],
  filter: {
    maxSize: 102400, // 100 Kb
    allow: {
      extensions: ['jar']
    },
    onInvalid: function(message){
      // Es gibt einen Fehler der jedesmal vorkommt, dass er behauptet das Objekt hätte eine auslesbare Filesize
      // trotzdem funktioniert irgendwie alles
      console.log("Error when trying to insert a file into RobotData");
      console.log(message);
    }
  }
});