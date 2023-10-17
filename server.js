const express = require("express");
const dotenv = require("dotenv").config({ path: "./config/config.env" }); // Carregando Vars de Ambiente

//Importando Rotas
const bootcamps = require("./routes/bootcampsRouter");

const app = express();

// Definindo Rotas
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Servidor Rodando na Porta ${PORT}, No Modo: ${process.env.NODE_ENV}`
  );
});
