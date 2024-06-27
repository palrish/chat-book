import express from "express";
import { getUser, getUserForSidebar } from "../Controllers/userController.js";
import protectRoute from "../Middleware/protectRoute.js";

const router = express.Router();

router.get('/me', protectRoute, getUser);
router.get('/', protectRoute, getUserForSidebar);

export default router;