import { Request, Response } from "express";
import { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket, getTicketWithUrgency } from "../services/ticketService";

import { HTTP_STATUS } from "../../../constants/httpConstants";
import { NewTicketRequest, TicketUpdate } from "../interfaces/ticketInterfaces";

export const getAllTicketsHandler = (req: Request, res: Response): void => {
    try {
        const tickets = getAllTickets();
        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: tickets,
            count: tickets.length
        });
    } 
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to retrieve tickets"
        });
    }
};

export const getTicketByIdHandler = (req: Request, res: Response): void => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: 'Invalid ticket ID'
            });
            return;
        }
        
        const ticket = getTicketById(id);
        
        if (!ticket) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: 'Ticket not found'
            });
            return;
        }
        
        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: ticket
        });
    } 
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to retrieve ticket'
        });
    }
};