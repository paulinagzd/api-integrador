const Sequelize = require('sequelize');
const { grado_academico } = require('../models');

module.exports = {
  create(req, res) {
    return grado_academico
      .create({
        nombre: req.body.nombre,
        id_profesor: req.body.id_profesor,
      })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return grado_academico.findAll({})
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    return grado_academico.findAll({
      where: {
        id: req.params.id,
      },
    })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },
};
