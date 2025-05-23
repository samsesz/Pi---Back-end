// Importando o Express com ES6 Modules
import express from "express";
// Iniciando o Express na variável app
const app = express();
// Importando os Controllers (onde estão as rotas)
import RotasController from "./controllers/RotasController.js";
import UsuariosController from "./controllers/UsuariosController.js";
import EstatisticasController from "./controllers/EstatisticasController.js";
import CheckpointsController from "./controllers/CheckpointsController.js";
// Importando o Sequelize
import Sequelize from ".config/sequelize-config.js"
// Conexão com o banco
connection.authenticate().then(() => {
  console.log("Conexão com o banco de dados feita com sucesso!")
}).catch((error) => {
  console.log(error)
});
// Criando banco de dados 
connection.query(`CREATE DATABASE IF NOT EXISTS memori;`).then(() => {
  console.log("O banco de dados foi criado.")
}).catch((error) => {
  console.log(error)
});

// Dados vindos dos formularios
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
// Define o EJS como Renderizador de páginas
app.set("view engine", "ejs");
// Define o uso da pasta "public" para uso de arquivos estáticos
app.use(express.static("public"));

// Definindo o uso das rotas dos Controllers
app.use("/", UsuariosController);
app.use("/", RotasController);
app.use("/", EstatisticasController);
app.use("/", CheckpointsController);

// ROTA PRINCIPAL
app.get("/", function (req, res) {
  res.render("index");
});

// INICIA O SERVIDOR NA PORTA 8080
const port = 8080;
app.listen(port, function (erro) {
  if (erro) {
    console.log("Ocorreu um erro!");
  } else {
    console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
  }
});
