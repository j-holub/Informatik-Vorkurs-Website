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

