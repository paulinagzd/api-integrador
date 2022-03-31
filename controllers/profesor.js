const Sequelize = require('sequelize');
const { profesor } = require('../models');

module.exports = {
  create(req, res) {
    return profesor
      .create({
        nomina: req.body.nomina,
        nombre: req.body.nombre,
      })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return profesor.findAll({})
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    return profesor.findAll({
      where: {
        nomina: req.params.nomina,
      },
    })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },
};
