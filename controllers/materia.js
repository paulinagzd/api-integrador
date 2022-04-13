const Sequelize = require('sequelize');
const { materia } = require('../models');

module.exports = {
  create(req, res) {
    return materia
      .create({
        id: req.body.id,
        codigo: req.body.codigo,
        nombre: req.body.nombre,
      })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return materia.findAll({})
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    return materia.findAll({
      where: {
        codigo: req.params.codigo,
      },
    })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },
};
