const Sequelize = require('sequelize');
const { maestria_aceptada, materia } = require('../models');

module.exports = {
  async create(req, res) {
    try{
      mat = await materia.findOne({
        where: {
          codigo: req.body.codigo,
        },
      });
    }
    catch(e){
      console.log(e);
      return res.status(400).send(e);
    }
    if(mat == null){
      return res.status(400).send("could not find materia");
    }
    return maestria_aceptada
      .create({
        nombre: req.body.nombre,
        id_materia: mat.dataValues.id,
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
  async delete(req, res){
    console.log("deleting...")
    console.log(req.body)
    console.log(req.params.id)
    const row = await maestria_aceptada.findOne({
      where: { id: req.params.id },
    });
    if(row){
      return row.destroy()
        .then((p)=> res.status(200).send(p))
        .catch((error) => res.status(400).send(error));
    }
    else{
      return res.status(400).send("could not find maestria_aceptada");
    }
  },
};
