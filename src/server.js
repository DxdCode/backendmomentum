import './env.js'; 
import app from './app.js';
import sequelize from './database.js';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a PostgreSQL correctamente');

    await sequelize.sync({ alter: true });
    console.log('✅ Tablas sincronizadas');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar el servidor:', err);
  }
})();
