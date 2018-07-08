 var mongoose = require("mongoose");
 var Campground = require("./models/campground");
 var Comment    = require("./models/comment");

var data = [
  {
  name:"Gulshan",
  image:"https://cdn.pixabay.com/photo/2018/06/12/01/04/road-3469810__340.jpg",
  description:"I am very ecited as this will be my first website. very thanks to the instructor of this course colt steele.i sometimes get nervous becoz of the errors.but i also get happy when i solve them atleast in an hour or two hour."
},
{
  name:"gulshan2",
  image:"https://cdn.pixabay.com/photo/2018/06/24/03/06/ship-3493887__340.jpg",
  description:"I am very ecited as this will be my first website. very thanks to the instructor of this course colt steele.i sometimes get nervous becoz of the errors.but i also get happy when i solve them atleast in an hour or two hour."
},
{
  name:"gulshan3",
  image:"https://cdn.pixabay.com/photo/2018/06/17/17/00/yacht-3480913__340.jpg",
  description:"I am very ecited as this will be my first website. very thanks to the instructor of this course colt steele.i sometimes get nervous becoz of the errors.but i also get happy when i solve them atleast in an hour or two hour."
}];

 function seedDB(){
   //campground removed
   Campground.remove({},function(err){
   if(err){
     console.log(err);
   }else{
     console.log("removed campgrounds");
   }
   //add a campground
   data.forEach(function(seed){
     Campground.create(seed , function(err ,campground){
       if(err){
         console.log(err);
       }else{
         console.log("added campground");
       }
       //add comments
        Comment.create({
          text:"this place is awesome",
          author:"gulshan"
        },function(err,comment){
          if(err){
            console.log(err);
          }else{
          campground.comments.push(comment);
          campground.save();
          console.log("created new comment");
          }
        });
     });
   });
 });
 };
module.exports = seedDB ;
