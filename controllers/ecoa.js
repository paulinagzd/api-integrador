const Sequelize = require('sequelize');
const { ecoa } = require('../models');

module.exports = {
  create(req, res) {
    return ecoa
      .create({
        fecha: req.body.fecha,
        calificacion: req.body.calificacion,
        id_materia_impartida: req.body.id_materia_impartida
      })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return ecoa.findAll({})
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    return ecoa.findAll({
      where: {
        id: req.params.id,
      },
    })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },
};
