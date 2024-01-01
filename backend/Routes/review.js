import express from "express";
import { getAllReviews, createReviews } from "../contoller/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router({ mergeParams: true })

router.route('/')
    .get(getAllReviews)
    .post(authenticate, restrict(['patient']), createReviews);

export default router