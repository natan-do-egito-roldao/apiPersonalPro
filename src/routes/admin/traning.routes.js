import express from "express";
import { createtraining } from "../../controllers/admin/traning.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const router = express.Router()

router.post('/', authenticate, authorize('ADM'), createtraining)

export default router