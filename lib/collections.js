
// Roboter die von den Usern hochgeladen werden
Robots = new Mongo.Collection('robots');

// Turniere
Tournaments = new Mongo.Collection('tournaments');


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
})
