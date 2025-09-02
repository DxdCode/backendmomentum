import app from "./app.js";
import sequelize from "./database.js";

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a Postgres.");
    await sequelize.sync({ alter: true });

    app.listen(app.get("port"), () => {
      console.log(`Servidor activo en http://localhost:${app.get("port")}`);
    });
  } catch (error) {
    console.error("Error al conectarse con la base de datos:", error);
    process.exit(1);
  }
}

startServer();
