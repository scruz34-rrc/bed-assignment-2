import request from "supertest";
import express from "express";

const app = express();
app.use(express.json());

const mockControllers = {
  getAllTicketsHandler: jest.fn((req, res) => {
    res.status(200).json({ message: "Mock: Tickets retrieved" });
  }),
  getTicketByIdHandler: jest.fn((req, res) => {
    res.status(200).json({ data: { id: 1, title: "Mock Ticket" } });
  }),
  createTicketHandler: jest.fn((req, res) => {
    res.status(201).json({ message: "Mock: Ticket created" });
  }),
  updateTicketHandler: jest.fn((req, res) => {
    res.status(200).json({ message: "Mock: Ticket updated" });
  }),
  deleteTicketHandler: jest.fn((req, res) => {
    res.status(200).json({ message: "Mock: Ticket deleted" });
  }),
  getTicketUrgencyHandler: jest.fn((req, res) => {
    res.status(200).json({ message: "Mock: Urgency calculated" });
  })
};

jest.mock("../src/api/v1/controllers/ticketController", () => mockControllers);

import ticketRoutes from "../src/api/v1/routes/ticketRoutes";

app.use("/api/v1", ticketRoutes);

describe("Ticket Routes", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("GET /api/v1/health", () => {
		it("should return health status", async () => {
			const response = await request(app).get("/api/v1/health");
			
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("status", "OK");
			expect(response.body).toHaveProperty("uptime");
			expect(response.body).toHaveProperty("timestamp");
			expect(response.body).toHaveProperty("version", "1.0.0");
		});
	});

	describe("GET /api/v1/tickets", () => {
		it("should call getAllTicketsHandler controller", async () => {
			await request(app).get("/api/v1/tickets");
			expect(mockControllers.getAllTicketsHandler).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/tickets/:id", () => {
		it("should call getTicketByIdHandler controller", async () => {
			await request(app).get("/api/v1/tickets/1");
			expect(mockControllers.getTicketByIdHandler).toHaveBeenCalled();
		});
	});

	describe("POST /api/v1/tickets", () => {
		it("should call createTicketHandler controller", async () => {
			const mockTicketData = {
				title: "Test Ticket",
				description: "Test Description",
				priority: "medium"
			};

			await request(app)
				.post("/api/v1/tickets")
				.send(mockTicketData);
				
			expect(mockControllers.createTicketHandler).toHaveBeenCalled();
		});
	});

	describe("PUT /api/v1/tickets/:id", () => {
		it("should call updateTicketHandler controller", async () => {
			const updateData = {
				priority: "high",
				status: "in-progress"
			};

			await request(app)
				.put("/api/v1/tickets/1")
				.send(updateData);
				
			expect(mockControllers.updateTicketHandler).toHaveBeenCalled();
		});
	});

	describe("DELETE /api/v1/tickets/:id", () => {
		it("should call deleteTicketHandler controller", async () => {
			await request(app).delete("/api/v1/tickets/1");
			expect(mockControllers.deleteTicketHandler).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/tickets/:id/urgency", () => {
		it("should call getTicketUrgencyHandler controller", async () => {
			await request(app).get("/api/v1/tickets/1/urgency");
			expect(mockControllers.getTicketUrgencyHandler).toHaveBeenCalled();
		});
	});
});