const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const port = 3000;

// Import Rotas
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

// View engine
app.set('view engine', 'ejs');

// Satic
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

// Usar as Rotas importadas
app.use("/", categoriesController);
app.use("/", articlesController);

// Rota Principal
app.get("/", (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log("Servidor rodando!")
});