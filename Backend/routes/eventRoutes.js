import express from "express";
import { addEvent } from "../controllers/eventsControllers/addEventsControllers.js";
import {fetchAllEvents} from '../controllers/eventsControllers/allEventsControllers.js';
import {fetchMyEvents} from '../controllers/eventsControllers/myEventsControllers.js';
import { updateEvent } from "../controllers/eventsControllers/updateEventsControllers.js";
import { verifyToken } from "../utils/verifyToken.js"; // JWT verification middleware
import {upload} from "../Middleware/upload.js"  // Multer for file upload
import { buyTicket } from "../controllers/eventsControllers/ticketControllers.js";

const router = express.Router();

// Add Event (protected + file upload)
router.post("/add-event", verifyToken, upload.single("eventImage"), addEvent);

// Fetch all events (protected)
router.get("/all-events", verifyToken, fetchAllEvents);

// Fetch logged-in creator's events (protected)
router.get("/my-events", verifyToken, fetchMyEvents);

// Update an event (protected + file upload optional)
router.put("/update-event/:id", verifyToken, upload.single("eventImage"), updateEvent);

router.post("/buy-ticket/:eventId", verifyToken, buyTicket);

export default router;