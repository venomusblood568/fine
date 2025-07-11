import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import apiRouter from "./routes";
import "./models";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "https://fine-duck.vercel.app",
      "https://fine-p3kaxq0w0-venomusblood568s-projects.vercel.app",
    ],
    credentials: true,
  })
);

// Optional: handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
