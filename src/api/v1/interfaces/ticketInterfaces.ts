export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: string;
}

export interface NewTicketRequest {
    title: string;
    description: string;
    priority: string;
}

export interface TicketWithUrgency extends Ticket {
    ticketAge: number;
    urgencyScore: number;
    urgencyLevel: string;
}

export interface TicketUpdate {
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
}

export interface CreateTicketData {
    title: string;
    description: string;
    priority: string;
    status: string;
}