// Turniere
Tournaments = new Mongo.Collection('tournaments');


TournamentEntrySchema = new SimpleSchema({
  group: {
    type: String,
    label: "GruppenId"
  },
  robot: {
    type: String,
    label: "RoboterId"
  }
});

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
    type: [TournamentEntrySchema],
    label: "Teilnehmerliste"
  }
});

Tournaments.attachSchema(TournamentSchema);

