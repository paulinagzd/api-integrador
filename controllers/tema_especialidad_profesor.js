const Sequelize = require('sequelize');
const { tema_especialidad_profesor } = require('../models');
const {profesor} = require('../models')

module.exports = {
  async create(req, res) {
    try{
      prof = await profesor.findOne({
        where: {
          nomina: req.body.nomina,
        },
      });
    }
    catch(e){
      console.log(e);
      return res.status(400).send(e);
    }
    if(prof == null){
      return res.status(400).send("could not find profesor");
    }
    try{
      tem = await tema_especialidad.findOne({
        where: {
          nombre: req.body.nombre,
        },
      });
    }
    catch(e){
      console.log(e);
      return res.status(400).send(e);
    }
    if(tem == null){
      return tem.status(400).send("could not find tema de especialidad");
    }
    return tema_especialidad_profesor
      .create({
        nivel: req.body.nivel,
        id_tema_especialidad: tem.dataValues.id,
        id_profesor: prof.dataValues.id,
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
  findProfesoresWithEspecialidad(req, res){
    return tema_especialidad_profesor.findAll({
      where: {
        id_tema_especialidad: req.params.temaId, 
      },
      include: profesor,
    })
    .then((p)=> res.status(200).send(p))
    .catch((error)=> {
      console.log(error);
      res.status(400).send(error);});
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
  async delete(req, res){
    console.log("deleting...")
    console.log(req.body)
    console.log(req.params.id)
    const row = await tema_especialidad_profesor.findOne({
      where: { id: req.params.id },
    });
    if(row){
      return row.destroy()
        .then((p)=> res.status(200).send(p))
        .catch((error) => res.status(400).send(error));
    }
    else{
      return res.status(400).send("could not find tema_especialidad_profesor");
    }
  },
};
