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
  async set(req, res){
    console.log("updating...")
    console.log(req.body)
    console.log(req.params.id)
    temp_ecoa = null;
    try{
      temp_ecoa = await ecoa.findOne({
        where: {
          id: req.params.id,
        },
      });
    }
    catch(e){
      return res.status(400).send(e);
    }
    if(temp_ecoa == null){
      return res.status(400).send("could not find ecoa");
    }
    if(req.body.fecha){
      temp_ecoa.set(
        {fecha: req.body.fecha}
      );
    }
    if(req.body.calificacion){
      temp_ecoa.set(
        {calificacion: req.body.calificacion}
      );
    }
    return temp_ecoa.save()
    .then((p) => res.status(200).send(p))
    .catch((error) => res.status(400).send(error));
  },

};
