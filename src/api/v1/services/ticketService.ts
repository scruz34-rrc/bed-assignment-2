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

const calculateTicketAge = (createdAt: string): number => {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const ageInMs = now.getTime() - createdAtDate.getTime();
    return ageInMs / (1000 * 60 * 60 * 24);
}

export const calculateUrgency = (ticket: Ticket): {
    ticketAge: number;
    urgencyScore: number;
    urgencyLevel: string;
} => {
    if (ticket.status === "resolved") {
        return {
            ticketAge: calculateTicketAge(ticket.createdAt),
            urgencyScore: 0,
            urgencyLevel: "Minimal. Ticket resolved."
        };
    }

    const ticketAge = calculateTicketAge(ticket.createdAt);

    let baseScore: number;
    if (ticket.priority === 'critical') {
        baseScore = 50;
    } 
    else if (ticket.priority === 'high') {
        baseScore = 30;
    } 
    else if (ticket.priority === 'medium') {
        baseScore = 20;
    } 
    else if (ticket.priority === 'low') {
        baseScore = 10;
    } 
    else {
        baseScore = 0;
    }

    const urgencyScore = Math.floor(baseScore + (ticketAge * 5));
    let urgencyLevel: string;

    if (urgencyScore < 30) {
        urgencyLevel = "Low urgency. Address when capacity allows.";
    }
    else if (urgencyScore < 50) {
        urgencyLevel = "Moderate. Schedule for attention.";
    }
    else if (urgencyScore < 75) {
        urgencyLevel = "High urgency. Prioritize resolution.";
    }
    else {
        urgencyLevel = "Critical. Immediate attention required.";
    }

    return {
        ticketAge: Math.floor(ticketAge),
        urgencyScore,
        urgencyLevel
    };
};