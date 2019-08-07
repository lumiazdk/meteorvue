import { Meteor } from 'meteor/meteor';

import '/imports/collections/Time';
import '/imports/collections/Post';
// import '/imports/collections/User';


import '/imports/publications/Time';
import '/imports/publications/Post';
import '/imports/publications/User';


import '/imports/methods/UpdateTime';
import '/imports/methods/upload';
import './lronrouter'

Meteor.startup(() => {
  Router.configure({
    noRoutesTemplate: 'ReplacesSplashScreen'
  });
  // Update the current time
  Meteor.call('UpdateTime');
  // Add a new doc on each start.
  Time.insert({ time: new Date() });
  
  
  // Print the current time from the database
  console.log(`The time is now ${Time.findOne().time}`);
});