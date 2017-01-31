import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo'

import './main.html';

Images = new Mongo.Collection("images");
console.log("Image Count: " + Images.find().count());


var img_data = [
  {
    img_src: 'https://s-media-cache-ak0.pinimg.com/736x/b9/3b/dc/b93bdc427c9aee78e91e340b182e4777.jpg',
    img_alt: 'persian cat'
  } ,
  {
    img_src: 'http://www.petmd.com/sites/default/files/breedopedia/scottish_fold2.jpg',
    img_alt: 'scottish fold'
  } ,
  {
    img_src: 'http://animalia-life.club/data_images/munchkin-cat/munchkin-cat5.jpg',
    img_alt: 'munchkin cat'
  } ,
  {
    img_src: 'http://s3.amazonaws.com/assets.prod.vetstreet.com/08/3107a0a33511e087a80050568d634f/file/Siamese-2-645mk062211.jpg',
    img_alt: 'siamese cat'
  } ,
];

Template.images.onCreated(function helloOnCreated() {
  // counter starts at 0
  console.log("I am on client");

  this.counter = new ReactiveVar(0);
});

Template.images.helpers({images: img_data});

Template.images.events({
  'click .js-image' : function (event){
    console.log(event.target.alt);
    $(event.target).css("width", "50px");
  }
})

Template.images.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
