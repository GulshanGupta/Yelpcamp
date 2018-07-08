var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");
var middleware = require("../middleware");

//=======
// ROUTES
//=======
router.get("/campgrounds",function(req,res){
//get all campgrounds from db
Campground.find({},function(err,allcampgrounds){
if(err){
  console.log(err);
}
else{
  res.render("campgrounds/index",{campgrounds:allcampgrounds});
}
});
});
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
  var name= req.body.name;
  var price=req.body.price;
  var image= req.body.image;
  var desc= req.body.description;
  var author= {
    id:req.user._id,
    username:req.user.username
  }
  var newcampground = {name:name ,price:price, image:image , description:desc,author:author} ;
  //create a new campground and save to db
  Campground.create(newcampground,function(err,newlycreated){
    if(err)
    {
      console.log(err);
}
      else {
        //redirect back to campgrounds page
        req.flash("success","Campground added successfully")
            res.redirect("/campgrounds");
        }
      });
    });

router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
  res.render("campgrounds/new");
});
//show route
router.get("/campgrounds/:id",function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
if(err){
  console.log(err);
}
  else{
    console.log(foundCampground);
res.render("campgrounds/show",{campground:foundCampground});
  }
});
});

//edit campground ROUTES
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
    res.render("campgrounds/edit",{campground:foundCampground});
  });
});


//update campground ROUTES
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err , updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    }else{
      req.flash("success","Campground edited successfully");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//delete campground ROUTES
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndRemove(req.params.id,function(err){
    if(err){
      res.redirect("/campgrounds");
    }else{
      req.flash("success","Campground deleted successfully");
      res.redirect("/campgrounds");
    }
  });
});


module.exports = router;
