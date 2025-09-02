import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config();

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// CONFIGURACIÓN
app.set("port", process.env.PORT || 3000);

// RUTAS
app.get("/", (req, res) => {
  res.send("Servidor activo de momentum");
});

// MANEJO DE RUTAS NO ENCONTRADAS
app.use((req, res) => {
    res.status(404).send("Endpoint no encontrado")
})

export default app