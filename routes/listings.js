const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const passport = require("passport");
const {isOwner , validateListing , isLoggedIn} = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//controller
const listingController = require("../controllers/listings.js");


router
    .route("/")

    //Index Route
    .get( wrapAsync(listingController.index) )

    //Create route
    .post(
        isLoggedIn, 
        validateListing, 
        upload.single("listing[image]"),
        wrapAsync(listingController.createListing)
    );
    

//New Route
router.get(
    "/new", 
    isLoggedIn, 
    listingController.renderNewForm
);

//category
router.get(
    "/category",
    wrapAsync(listingController.categoryListing)
);

//search
router.get(
    "/search",
    wrapAsync(listingController.searchListing)
);

router
    .route("/:id")

    //Show route
    .get(wrapAsync(listingController.showListing))

    //Update Route
    .put(
        isLoggedIn, 
        isOwner, 
        upload.single("listing[image]"),
        validateListing, 
        wrapAsync(listingController.updateListing)
    )

    //Destroy Route
    .delete(
        isLoggedIn, 
        isOwner, 
        wrapAsync( listingController.destroyListing )
    );


//Edit Route
router.get(
    "/:id/edit", 
    isLoggedIn, 
    isOwner, 
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;