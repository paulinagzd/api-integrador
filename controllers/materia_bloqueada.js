const Sequelize = require('sequelize');
const { materia_bloqueada } = require('../models');

module.exports = {
  create(req, res) {
    return materia_bloqueada
      .create({
        id_materia: req.body.id_materia,
      })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return materia_bloqueada.findAll({})
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    return materia_bloqueada.findAll({
      where: {
        id: req.params.id,
      },
    })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },
};
