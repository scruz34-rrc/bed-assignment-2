import { Ticket, TicketUpdate, NewTicketRequest } from "../interfaces/ticketInterfaces";
import * as ticketData from "../../../data/tickets";

export const getAllTickets = (): Ticket[] => {
    return ticketData.getAllTickets();
}

export const getTicketById = (id: number): Ticket | null => {
    const ticket = ticketData.getTicketById(id);
    return ticket || null;
};