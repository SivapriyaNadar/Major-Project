const express = require("express");
const router = express.Router({mergeParams: true});
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

//controller
const reviewController = require("../controllers/reviews.js");


//Reviews
//Post Review Route
router.post(
    "/", 
    isLoggedIn, 
    validateReview, 
    wrapAsync( reviewController.createReview )
);

//Delete Review Route
router.delete(
    "/:reviewId", 
    isLoggedIn, 
    isReviewAuthor, 
    wrapAsync( reviewController.destroyReview)
);

module.exports = router;