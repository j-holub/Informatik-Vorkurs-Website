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
    // Setzt die Downloadbarkeit automatisch auf falsch
    autoValue: function(){
      if(this.isInsert){
        return false;
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
    allow: {
      extensions: ['jar']
    }
  },
  onInvalid: function (message) {
      if (Meteor.isClient) {
        alert(message);
      } else {
        console.log(message);
      }
    }
});