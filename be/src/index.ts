import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import apiRouter from "./routes";
import "./models";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "https://fine-duck.vercel.app",
  "https://fine-23hwalbqe-venomusblood568s-projects.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Handle preflight for all routes
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
