import express from "express";
import session from "express-session"; // <-- changed here
import passport from "passport";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import corsConfig from "./middleware/cors.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import "./config/passport.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(corsConfig);

app.set("trust proxy", 1); // important when using secure cookies

// ✅ Use express-session instead of cookie-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: false,        // ✅ allow over HTTP
      httpOnly: true,
      sameSite: "lax",      // ✅ works with http://localhost cross-origin in dev
    },
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`[SERVER] Running on http://localhost:${PORT}`);
});
