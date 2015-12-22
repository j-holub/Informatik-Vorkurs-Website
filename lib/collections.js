
// User Schema

ProfileSchema = new SimpleSchema({
  firstname:{
    type: String,
    label: "Vorname"
  },
  lastname:{
    type: String,
    label: "Nachname"
  }
});

UserSchema = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails:{
    type: Array,
  },
  'emails.$':{
    type: Object
  },
  'emails.$.address':{
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified':{
    type: Boolean
  },
  createdAt: {
    type: Date,
  },
  profile:{
    type: ProfileSchema
  },
  services: {
   type: Object,
   optional: true,
   blackbox: true
  },
  // Benötigt um 'Exception in setInterval callback' Error zu vermeiden
  heartbeat: {
    type: Date,
    optional: true
  }
});

Meteor.users.attachSchema(UserSchema);


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
    optional: true
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

// Turniere
Tournaments = new Mongo.Collection('tournaments');


TournamentSchema = new SimpleSchema({
  name:{
    type: String,
    label: "Turniername"
  },
  date:{
    type: Date,
    label: "Turnierdatum"
  },
  participants:{
    type: [String],
    label: "Teilnehmerliste"
  }
});

Tournaments.attachSchema(TournamentSchema);

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
        console.log("foo");
        console.log(message);
      }
    }
});
