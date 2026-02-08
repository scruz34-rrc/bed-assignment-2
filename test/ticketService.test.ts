import * as ticketService from "../src/api/v1/services/ticketService";

jest.mock("../src/data/tickets");

describe("Ticket Service - Urgency Calculation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("calculateUrgency", () => {
    it("should return minimal urgency for resolved tickets", () => {
      // Arrange
      const resolvedTicket = {
        id: 1,
        title: "Resolved Ticket",
        description: "Already resolved",
        priority: "high",
        status: "resolved",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      // Act
      const result = ticketService.calculateUrgency(resolvedTicket);

      // Assert
      expect(result.urgencyScore).toBe(0);
      expect(result.urgencyLevel).toBe("Minimal. Ticket resolved.");
      expect(result.ticketAge).toBeGreaterThan(0);
    });

    it("should calculate correct urgency for critical priority tickets", () => {
      // Arrange
      const criticalTicket = {
        id: 2,
        title: "Critical Ticket",
        description: "Critical issue",
        priority: "critical",
        status: "open",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      };

      // Act
      const result = ticketService.calculateUrgency(criticalTicket);

      // Assert
      expect(result.urgencyScore).toBeGreaterThanOrEqual(50);
      expect(result.urgencyLevel).toMatch(/High urgency|Critical/);
      expect(result.ticketAge).toBe(3);
    });

    it("should calculate correct urgency for low priority tickets", () => {
      // Arrange
      const lowTicket = {
        id: 3,
        title: "Low Priority Ticket",
        description: "Low priority issue",
        priority: "low",
        status: "open",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      };

      // Act
      const result = ticketService.calculateUrgency(lowTicket);

      // Assert
      expect(result.urgencyScore).toBeGreaterThanOrEqual(10);
      expect(result.urgencyLevel).toMatch(/Low urgency/);
      expect(result.ticketAge).toBe(1);
    });

    it("should increase urgency score with ticket age", () => {
      // Arrange
      const oldTicket = {
        id: 4,
        title: "Old Ticket",
        description: "Old issue",
        priority: "medium",
        status: "open",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      };

      // Act
      const result = ticketService.calculateUrgency(oldTicket);

      // Assert
      expect(result.urgencyScore).toBe(20 + (10 * 5));
      expect(result.ticketAge).toBe(10);
      expect(result.urgencyLevel).toMatch(/High urgency|Critical/);
    });
  });
});