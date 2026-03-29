import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://wiggle-production.up.railway.app",
        "https://wiggle-33.netlify.app",
      ];

      // Check if origin matches Railway or Netlify pattern
      const isRailway = origin && origin.includes("railway.app");
      const isNetlify = origin && origin.includes("netlify.app");
      const isAllowed = !origin || allowedOrigins.includes(origin) || isRailway || isNetlify;

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use("/api/auth", authRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running!", missingTools: [] });
});

export default app;
