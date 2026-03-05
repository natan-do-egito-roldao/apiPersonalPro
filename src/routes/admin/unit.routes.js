import express from "express";
import { createUnit } from "../../controllers/admin/unit.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { getAllUnits } from "../../controllers/unit.controller.js";

const router = express.Router()

router.post('/', authenticate, authorize('ADM'), createUnit)

export default router