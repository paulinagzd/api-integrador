const Sequelize = require('sequelize');
const { materia_bloqueada, profesor, materia } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      prof = await profesor.findOne({
        where: {
          nomina: req.body.nomina,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(400).send(e);
    }
    if (prof == null) {
      return res.status(400).send('could not find profesor');
    }
    try {
      mat = await materia.findOne({
        where: {
          codigo: req.body.codigo,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(400).send(e);
    }
    if (mat == null) {
      return mat.status(400).send('could not find materia');
    }
    return materia_bloqueada
      .create({
        id_materia: mat.dataValues.id,
        id_profesor: prof.dataValues.id,
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

  findMateriasWithProfesor(req, res) {
    return materia_bloqueada.findAll({
      where: {
        id_profesor: req.params.profesorId,
      },
      include: materia,
    })
      .then((p) => res.status(200).send(p))
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  async delete(req, res) {
    console.log('deleting...');
    console.log(req.body);
    console.log(req.params.id);
    const row = await materia_bloqueada.findOne({
      where: { id: req.params.id },
    });
    if (row) {
      return row.destroy()
        .then((p) => res.status(200).send(p))
        .catch((error) => res.status(400).send(error));
    }

    return res.status(400).send('could not find materia_bloqueada');
  },
};
