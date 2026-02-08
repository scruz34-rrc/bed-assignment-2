import express, { Express } from "express";
import morgan from "morgan";
import ticketRoutes from "./api/v1/routes/ticketRoutes";

const app: Express = express();
app.use(express.json());
app.use(morgan("combined"));
app.use("/api/v1", ticketRoutes);

export default app;