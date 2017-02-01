import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

if(Meteor.isServer){
    Meteor.startup(() => {
  // code to run on server at startup
  console.log("code is running server");

   Images = new Mongo.Collection("images");

  if (Images.find().count() === 0){
    for (var i = 1; i < 23; i++){
      Images.insert(
        {
          img_src: "public/images/img_"+ i + ".jpg",
          img_alt: 'image number ' + i
        },
      )
    } //end for
    // count the images
    console.log("img ct public." + Images.find().count());

    }// end of if
      });
  } // end of if server
