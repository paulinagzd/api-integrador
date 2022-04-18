const Sequelize = require('sequelize');
const { grado_academico } = require('../models');

module.exports = {
  create(req, res) {
    return grado_academico
      .create({
        nombre: req.body.nombre,
        id_profesor: req.body.id_profesor,
        tipo_de_grado: req.body.tipo_de_grado,
        institucion: req.body.institucion,
        lugar_de_emision: req.body.lugar_de_emision,
        fecha_de_emision: req.body.fecha_emision,
        CIP_normatividad: req.body.CIP_normatividad
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
