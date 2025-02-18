const express = require("express");
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('../articles/Article');
const slugify = require('slugify');

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles/index", {articles});
    });
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories});
    })
});

router.post("/articles/save", (req, res) =>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles")
    });
});

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){ //SE FOR DIFERENTE DE NULO
        if(!isNaN(id)){ //SE FOR UM NÚMERO

            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });

        }else { //SE NÃO FOR UM NÚMERO
            res.redirect("/admin/articles");
        }
    }else { //SE FOR NULO
        res.redirect("/admin/articles");
    }
});

module.exports = router;