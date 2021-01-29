const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Cria e salva um novo tutorial
exports.create = (req, res) => {
    //Valida request
    if(!req.body.title){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Salva o tutorial
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occured while creating the Tutorial."
            })
        })
};

// Retorna todos os tutoriais
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

// Encontra um tutorial com o id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id= " + id
            });
        });
};

// Atualiza um tutorial com o id no request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id}
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Tutorial was updated successfully."
                });
            }
            else{
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id= " + id
            });
        });
};

// Delete um tutorial com um específico id no request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            }
            else{
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id= " + id 
            });
        });
};

// Deleta todos os tutoriais
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// Encontra todos os tutorial publicados
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
        .then( data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
