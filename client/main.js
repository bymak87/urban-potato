import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo'

import './main.html';

Images = new Mongo.Collection("images");
console.log("Image Count: " + Images.find().count());

if( Meteor.isClient){
Template.images.onCreated(function helloOnCreated() {
  // counter starts at 0
  console.log("I am on client");

});

//Template.images.helpers({images: img_data});
Template.images.helpers({ images:
  Images.find({}, {sort:{createdOn: -1, rating:-1}})
});

Template.images.events({
  'click .js-image' : function (event){
    console.log(event.target.alt);
    $(event.target).css("width", "50px");
  },
  'click .js-del-image' : function (event){
    var image_id = this._id;
    console.log(image_id);
    $("#"+image_id).hide('slow', function (){
      Images.remove({"_id" : image_id});
    })


  },
  'click .js-rate-image' : function (event){
    var rating = $(event.currentTarget).data("userrating");
    var image_id = this.id;
    console.log(image_id);
    Images.update({_id:image_id},
    {$set: {rating:rating}});
    console.log(rating);

  },
  'click .js-show-image-form' : function (event){
    $("#image_add_form").modal('show');
  },
  });
  Template.image_add_form.events({
    'submit .js-add-image' : function (event){
      var img_src, img_alt;
      img_src = event.target.img_src.value; //use javascript for forms instead of jquery
      img_alt = event.target.img_alt.value;
      console.log("src: " + img_src + "alt : " + img_alt);
      Images.insert({
        img_src: img_src,
        img_alt: img_alt,
        createdOn: new Date()
      })
      $("#image_add_form").modal('show');
      return false;//does not refresh page

    }
  })


}


// var img_data = [
//   {
//     img_src: 'https://s-media-cache-ak0.pinimg.com/736x/b9/3b/dc/b93bdc427c9aee78e91e340b182e4777.jpg',
//     img_alt: 'persian cat'
//   } ,
//   {
//     img_src: 'http://www.petmd.com/sites/default/files/breedopedia/scottish_fold2.jpg',
//     img_alt: 'scottish fold'
//   } ,
//   {
//     img_src: 'http://animalia-life.club/data_images/munchkin-cat/munchkin-cat5.jpg',
//     img_alt: 'munchkin cat'
//   } ,
//   {
//     img_src: 'http://s3.amazonaws.com/assets.prod.vetstreet.com/08/3107a0a33511e087a80050568d634f/file/Siamese-2-645mk062211.jpg',
//     img_alt: 'siamese cat'
//   } ,
// ];
