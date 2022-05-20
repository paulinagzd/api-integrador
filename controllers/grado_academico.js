const Sequelize = require('sequelize');
const { grado_academico, profesor } = require('../models');

//TODO: Add validation
function setFields(grad, body){
  if(body.nombre){
    grad.set(
      {nombre: body.nombre}
    );
  }
  if(body.tipo_de_grado){
    grad.set(
      {tipo_de_grado: body.tipo_de_grado}
    );
  }
  if(body.institucion){
    grad.set(
      {institucion: body.institucion}
    );
  }
  if(body.lugar_de_emision){
    grad.set(
      {lugar_de_emision: body.lugar_de_emision}
    );
  }
  if(body.fecha_de_emision){
    grad.set(
      {fecha_de_emision: body.fecha_de_emision}
    );
  }
  if(body.CIP_normatividad){
    grad.set(
      {CIP_normatividad: body.CIP_normatividad}
    );
  }
}

module.exports = {
  async create(req, res) {
    try{
      //console.log("REQUEST:", req.body);
      prof = await profesor.findOne({
        where: {
          nomina: req.body.nomina,
        },
      });
      //console.log("PROF:",prof);
      //console.log("TEST:", prof.dataValues.id);
    }
    catch(e){
      console.log(e);
      return res.status(400).send(e);
    }
    if(prof == null){
      return res.status(400).send("could not find profesor");
    }
    return grado_academico
      .create({
        nombre: req.body.nombre,
        id_profesor: prof.dataValues.id,
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
  async set(req, res){
    console.log("updating...")
    console.log(req.body)
    console.log(req.params.id)
    grad = null;
    try{
      grad = await grado_academico.findOne({
        where: {
          id: req.params.id,
        },
      });
    }
    catch(e){
      return res.status(400).send(e);
    }
    if(grad == null){
      return res.status(400).send("could not find grado_academico");
    }
    setFields(grad, req.body);
    return grad.save()
    .then((p) => res.status(200).send(p))
    .catch((error) => res.status(400).send(error));
  },
  async delete(req, res){
    console.log("deleting...")
    console.log(req.body)
    console.log(req.params.id)
    const row = await grado_academico.findOne({
      where: { id: req.params.id },
    });
    if(row){
      return row.destroy()
        .then((p)=> res.status(200).send(p))
        .catch((error) => res.status(400).send(error));
    }
    else{
      return res.status(400).send("could not find grado_academico");
    }
  },
};
