const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config({ path: "./config/config.env" }); // Carregando Vars de Ambiente
const connectDB = require("./config/db");

//Conectando a DB
connectDB();

//Importando Rotas
const bootcamps = require("./routes/bootcampsRouter");

const app = express();

// Body Parser
app.use(express.json());

//Logging Middleware [DEV]
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Montando Rotas
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Servidor Rodando na Porta ${PORT}, No Modo: ${process.env.NODE_ENV}`
  );
});

// Lidar com unhandledRejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Fechando Servidor e Saindo do Processo
  server.close(() => process.exit(1));
});
