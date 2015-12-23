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