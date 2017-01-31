import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
    Meteor.startup(() => {
  // code to run on server at startup
  console.log("code is running server");

  var Images = new Mongo.Collection("images");

  if (Images.find().count() === 0){
    Images.insert(
      {
        img_src: "https://s-media-cache-ak0.pinimg.com/736x/b9/3b/dc/b93bdc427c9aee78e91e340b182e4777.jpg",
        img_alt: "persian cats"
      },
      {
        img_src: "http://animalia-life.club/data_images/munchkin-cat/munchkin-cat5.jpg",
        img_alt: "munchkin cats"
      }

    )
    }// end of if
      });
  } // end of if server
