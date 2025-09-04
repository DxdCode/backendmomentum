import app from "./app.js";
import sequelize from "./config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  } catch (err) {
    console.error("Error al iniciar el servidor:", err);
  }
};

startServer();
