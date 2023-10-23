const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`Conectado a Base de Dados com Sucesso: ${conn.connection.host}`);
};

module.exports = connectDB;
