import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import userRoutes from "./routes/userRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import progressRouter from "./routes/progressRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import gamificationRouter from "./routes/gamificationRoutes.js";

dotenv.config();

const app = express();
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:3000"
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Ruta inicial
app.get('/', (req, res) => {
  res.send({ title: 'Backend inicializado' });
});

app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/progress", progressRouter)
app.use("/api/notification", notificationRouter)
app.use("api/gamification",gamificationRouter)

app.use((req, res, next) => {
  res.status(404).json({ msg: "Not Found" });
});
export default app;
