const Sequelize = require('sequelize');
const { materia } = require('../models');

module.exports = {
  create(req, res) {
    return materia
      .create({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        semestre: req.body.semestre,
        periodo: req.body.periodo,
        duracion_en_semanas: req.body.duracion_en_semanas,
        plan: req.body.plan,
        unidades_de_carga: req.body.unidades_de_carga,
        CIP: req.body.CIP,
        notas: req.body.notas
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
