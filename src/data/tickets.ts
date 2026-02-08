import { Ticket, TicketUpdate } from "../api/v1/interfaces/ticketInterfaces";

let tickets: Ticket[] = [
     {
        id: 1,
        title: "Update footer copyright year",
        description: "Footer still shows 2024",
        priority: "low",
        status: "open",
        createdAt: "2025-01-12T10:00:00.000Z",
    },

    {
        id: 2,
        title: "Profile picture upload slow",
        description: "Upload takes 30+ seconds",
        priority: "medium",
        status: "open",
        createdAt: "2025-01-13T10:00:00.000Z",
    },

    {
        id: 3,
        title: "Dashboard loading slowly",
        description: "Dashboard takes 10+ seconds to load",
        priority: "medium",
        status: "open",
        createdAt: "2025-01-09T10:00:00.000Z",
    },

    {
        id: 4,
        title: "Password reset email delayed",
        description: "Reset emails taking over 30 minutes",
        priority: "high",
        status: "open",
        createdAt: "2025-01-10T10:00:00.000Z",
    },

    {
        id: 5,
        title: "Export to PDF not working",
        description: "PDF export fails silently",
        priority: "high",
        status: "open",
        createdAt: "2025-01-06T10:00:00.000Z",
    },

    {
        id: 6,
        title: "Login page not loading",
        description: "Users report blank screen on login",
        priority: "critical",
        status: "open",
        createdAt: "2025-01-09T10:00:00.000Z",
    },

    {
        id: 7,
        title: "Dark mode toggle broken",
        description: "Dark mode doesn't persist after refresh",
        priority: "medium",
        status: "resolved",
        createdAt: "2025-01-05T10:00:00.000Z",
    }
];

export const getAllTickets = (): Ticket[] => {
    return [...tickets];
};

export const getTicketById = (id: number): Ticket | undefined => {
    return tickets.find(ticket => ticket.id === id);
};

export const addTicket = (ticket: {
    title: string;
    description: string;
    priority: string;
}): Ticket => {
    const newId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 :1;
    const newTicket: Ticket = {
        ...ticket,
        id: newId,
        status: "open",
        createdAt: new Date().toISOString()
    };
    tickets.push(newTicket);
    return(newTicket);
};

export const updateTicket = (id: number, updates: TicketUpdate): Ticket | null => {
    const index = tickets.findIndex(ticket => ticket.id === id);
    if (index === -1) return null;

    tickets[index] = {...tickets[index], ...updates};
    return tickets[index];
};