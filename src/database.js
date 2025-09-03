import { Sequelize } from "sequelize";
console.log("DB:", process.env.POSTGRES_DB);
console.log("USER:", process.env.POSTGRES_USER);
console.log("HOST:", process.env.POSTGRES_HOST);

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    logging: true,
        define: {
      schema: 'public' 
    }
  }
);

export default sequelize;
