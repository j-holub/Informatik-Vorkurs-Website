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
    type: [String], // IDs der Gruppen die Teilnehmen
    label: "Teilnehmerliste"
  }
});

Tournaments.attachSchema(TournamentSchema);

