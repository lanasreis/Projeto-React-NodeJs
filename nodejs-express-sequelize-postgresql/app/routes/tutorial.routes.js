module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller");

    var router = require("express").Router();

    // Cria um novo Tutorial
    router.post("/", tutorials.create);
    
    // Retorna todos os tutoriais
    router.get("/", tutorials.findAll);
    
    // Retorna todos os tutoriais publicados
    router.get("/published", tutorials.findAllPublished);
    
    // Retorna um determinado tutorial de acordo com o id
    router.get("/:id", tutorials.findOne);
    
    // Atualiza um tutorial
    router.put("/:id", tutorials.update);
    
    // Deleta um tutorial de acordo com o  id
    router.delete("/:id", tutorials.delete);
    
    // Deleta todos os tutoriais
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
}