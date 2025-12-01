import express from "express";
import { addEvent, fetchAllEvents, fetchMyEvents, updateEvent } from "../controllers/eventController.js";
import { verifyToken } from "../utils/verifyToken.js"; // JWT verification middleware
import { upload } from "../middlewares/uploads.js";    // Multer for file upload

const router = express.Router();

// Add Event (protected + file upload)
router.post("/add-event", verifyToken, upload.single("eventImage"), addEvent);

// Fetch all events (protected)
router.get("/all-events", verifyToken, fetchAllEvents);

// Fetch logged-in creator's events (protected)
router.get("/my-events", verifyToken, fetchMyEvents);

// Update an event (protected + file upload optional)
router.put("/update-event/:id", verifyToken, upload.single("eventImage"), updateEvent);

export default router;