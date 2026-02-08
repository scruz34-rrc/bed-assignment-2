import { Router } from "express";
import { 
    getAllTicketsHandler,
    getTicketByIdHandler, 
    createTicketHandler, 
    updateTicketHandler, 
    deleteTicketHandler,
    getTicketUrgencyHandler 
} from "../controllers/ticketController";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

router.get("/tickets", getAllTicketsHandler);
router.get("/tickets/:id", getTicketByIdHandler);
router.post("/tickets", createTicketHandler);
router.put("/tickets/:id", updateTicketHandler);
router.delete("/tickets/:id", deleteTicketHandler);
router.get("/tickets/:id/urgency", getTicketUrgencyHandler);

export default router;