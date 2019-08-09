import { Meteor } from "meteor/meteor";

import "/lib/collections/Time";
import "/lib/collections/Post";
// import '/lib/collections/User';

import "/lib/publications/Time";
import "/lib/publications/Post";
import "/lib/publications/User";

import "/lib/methods/UpdateTime";
import "/lib/methods/upload";
import "./lronrouter";

Meteor.startup(() => {


  // Update the current time
  Meteor.call("UpdateTime");
  // Add a new doc on each start.
  Time.insert({ time: new Date() });

  // Print the current time from the database
  console.log(`The time is now ${Time.findOne().time}`);
});
