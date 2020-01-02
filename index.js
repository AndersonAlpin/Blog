const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const port = 3000;

// Import Rotas
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Category = require("./categories/Category");
const Article = require("./articles/Article");

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

    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", { articles, categories });
        })
    });

});

app.get("/:slug", (req, res) => {

    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", { article, categories });
            })
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })

});

app.listen(port, () => {
    console.log("Servidor rodando!")
});