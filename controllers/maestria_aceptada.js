const Sequelize = require('sequelize');
const { maestria_aceptada } = require('../models');

module.exports = {
  create(req, res) {
    return maestria_aceptada
      .create({
        nombre: req.body.nombre,
      })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return maestria_aceptada.findAll({})
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    return maestria_aceptada.findAll({
      where: {
        id: req.params.id,
      },
    })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },
};
