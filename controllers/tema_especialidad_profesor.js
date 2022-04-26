const Sequelize = require('sequelize');
const { tema_especialidad_profesor } = require('../models');

module.exports = {
  create(req, res) {
    return tema_especialidad_profesor
      .create({
        nivel: req.body.nivel,
        id_tema_especialidad: req.body.id_tema_especialidad,
        id_profesor: req.body.id_profesor,
      })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return tema_especialidad_profesor.findAll({})
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    return tema_especialidad_profesor.findAll({
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
    esp = null;
    try{
      esp = await tema_especialidad_profesor.findOne({
        where: {
          id: req.params.id,
        },
      });
    }
    catch(e){
      return res.status(400).send(e);
    }
    if(esp == null){
      return res.status(400).send("could not find tema_especialidad_profesor");
    }
    if(req.body.nivel){
      esp.set(
        {nivel: req.body.nivel}
      );
    }
    return esp.save()
    .then((p) => res.status(200).send(p))
    .catch((error) => res.status(400).send(error));
  },
};
