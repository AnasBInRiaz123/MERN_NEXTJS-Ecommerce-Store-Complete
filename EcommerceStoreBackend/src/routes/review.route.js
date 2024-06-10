const express= require('express')
const router= express.Router()

const reviewController= require("../controller/reviews.controller")

router.post("/rewiews", reviewController.createReview)
router.get("/rewiews", reviewController.getReviews)
router.put("/rewiews/:id", reviewController.updateReviews)
router.delete("/rewiews/:id", reviewController.deleteReview)

module.exports= router
