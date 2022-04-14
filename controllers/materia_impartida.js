const Sequelize = require('sequelize');
const { materia_impartida } = require('../models');

module.exports = {
  create(req, res) {
    return materia_impartida
      .create({
        fecha: req.body.fecha,
      })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return materia_impartida.findAll({})
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    return materia_impartida.findAll({
      where: {
        id: req.params.id,
      },
    })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },
};
