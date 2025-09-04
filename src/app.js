import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:3000"
];

// CORS con credenciales (cookies)
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
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

export default app;
