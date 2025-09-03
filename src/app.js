import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// CONFIGURACIÓN
app.set("port", process.env.PORT || 3000);

// RUTA DE PRUEBA
app.get("/", (req, res) => {
  res.send("Servidor activo de momentum");
});

// RUTAS
app.use("/auth", authRoutes);  
app.use("/users", userRoutes);  

// MANEJO DE RUTAS NO ENCONTRADAS
app.use((req, res) => {
  res.status(404).send("Endpoint no encontrado");
});

export default app;
