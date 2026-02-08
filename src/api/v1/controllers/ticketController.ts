import { Request, Response } from "express";
import { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket, getTicketWithUrgency } from "../services/ticketService";

import { HTTP_STATUS } from "../../../constants/httpConstants";
import { NewTicketRequest, TicketUpdate } from "../interfaces/ticketInterfaces";

const validPriorities = ["critical", "high", "medium", "low"];
const validStatuses = ["open", "in-progress", "resolved"];

export const getAllTicketsHandler = (req: Request, res: Response): void => {
    try {
        const tickets = getAllTickets();
        res.status(HTTP_STATUS.OK).json({
            data: tickets,
            count: tickets.length
        });
    } 
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve tickets"
        });
    }
};

export const getTicketByIdHandler = (req: Request, res: Response): void => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Invalid ticket ID"
            });
            return;
        }
        
        const ticket = getTicketById(id);
        
        if (!ticket) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Ticket not found"
            });
            return;
        }
        
        res.status(HTTP_STATUS.OK).json({
            data: ticket
        });
    } 
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve ticket"
        });
    }
};

export const createTicketHandler = (req: Request, res: Response): void => {
    try {
        const { title, description, priority }: NewTicketRequest = req.body;
        
        if (!title || typeof title !== "string" || title.trim() === "") {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Missing required field: title"
            });
            return;
        }
        
        if (!description || typeof description !== "string" || description.trim() === "") {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Missing required field: description"
            });
            return;
        }
        
        if (!priority || !validPriorities.includes(priority)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Invalid priority. Must be one of: critical, high, medium, low"
            });
            return;
        }
        
        const newTicket = createTicket({ title, description, priority });
        
        res.status(HTTP_STATUS.CREATED).json({
            message: "Ticket created successfully",
            data: newTicket
        });
    } 
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to create ticket"
        });
    }
};

export const updateTicketHandler = (req: Request, res: Response): void => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Invalid ticket ID"
            });
            return;
        }
        
        const updates: TicketUpdate = req.body;
        
        if (updates.priority && !validPriorities.includes(updates.priority)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Invalid priority. Must be one of: critical, high, medium, low"
            });
            return;
        }
        
        if (updates.status && !validStatuses.includes(updates.status)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Invalid status. Must be one of: open, in-progress, resolved"
            });
            return;
        }
        
        const updatedTicket = updateTicket(id, updates);
        
        if (!updatedTicket) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Ticket not found"
            });
            return;
        }
        
        res.status(HTTP_STATUS.OK).json({
            message: "Ticket updated successfully",
            data: updatedTicket
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update ticket"
        });
    }
};

export const deleteTicketHandler = (req: Request, res: Response): void => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Invalid ticket ID"
            });
            return;
        }
        
        const deleted = deleteTicket(id);
        
        if (!deleted) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Ticket not found"
            });
            return;
        }
        
        res.status(HTTP_STATUS.OK).json({
            message: "Ticket deleted successfully"
        });
    } 
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to delete ticket"
        });
    }
};

export const getTicketUrgencyHandler = (req: Request, res: Response): void => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Invalid ticket ID"
            });
            return;
        }
        
        const urgencyData = getTicketWithUrgency(id);
        
        if (!urgencyData) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Ticket not found"
            });
            return;
        }
        
        const ticket = getTicketById(id);
        
        res.status(HTTP_STATUS.OK).json({
            message: "Urgency calculated successfully",
            data: {
                ...ticket,
                ticketAge: urgencyData.ticketAge,
                urgencyScore: urgencyData.urgencyScore,
                urgencyLevel: urgencyData.urgencyLevel
            }
        });
    } 
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to calculate ticket urgency"
        });
    }
};