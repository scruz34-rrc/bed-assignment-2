import { Ticket, TicketUpdate, NewTicketRequest } from "../interfaces/ticketInterfaces";
import * as ticketsData from "../../../data/tickets";

export const getAllTickets = (): Ticket[] => {
    return ticketsData.getAllTickets();
}

export const getTicketById = (id: number): Ticket | null => {
    const ticket = ticketsData.getTicketById(id);
    return ticket || null;
};

export const createTicket = (ticketData: NewTicketRequest): Ticket => {
    const newTicket = {
        ...ticketData,
        status: "open"
    };
    return ticketsData.addTicket(newTicket);
};

export const updateTicket = (id: number, updates: TicketUpdate): Ticket | null => {
    return ticketsData.updateTicket(id, updates);
};

export const deleteTicket = (id: number): boolean => {
    return ticketsData.deleteTicket(id);
};