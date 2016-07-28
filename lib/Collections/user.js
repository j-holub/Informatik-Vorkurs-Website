// User Schema

ProfileSchema = new SimpleSchema({
  firstname:{
    type: String,
    label: "Vorname"
  },
  lastname:{
    type: String,
    label: "Nachname"
  },
  profilePicData: {
    type: String,
    label: "Profilbild",
    optional: true
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
  },
  roles: {
    type: [String],
    label: "roles",
    optional: true,
    blackbox: true
  }
});

Meteor.users.attachSchema(UserSchema);


// ---- Profile Pic Storage ----

// erzeugt eine kleiner Thumbnailversion des ProfilePics
var createThumb = function(fileObj, readStream, writeStream){
  gm(readStream, fileObj.name()).resize(100, 100).stream().pipe(writeStream);
}

// profilePics
ProfilePics = new FS.Collection('profilePics', {
  stores: [
    new FS.Store.FileSystem('profilePics'),
    new FS.Store.FileSystem('profilePicsThumbs', {transformWrite: createThumb})
  ],
  filter: {
    maxSize: 1024000, // 1MB
    allow: {
      extensions: ['jpg', 'jpeg', 'png'],
      contentTypes: ['image/*']
    },
    onInvalid: function(message){
      Meteor.customFunctions.errorToast(message);
    }
  }
});

ProfilePics.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
  download: function(userId, doc){
    return true;
  }
});