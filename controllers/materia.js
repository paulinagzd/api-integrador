const Sequelize = require('sequelize');
const { materia } = require('../models');

//TODO: Add validation
function setFields(mat, body){
  if(body.nombre){
    mat.set(
      {nombre: body.nombre}
    );
  }
  if(body.tipo){
    mat.set(
      {tipo: body.tipo}
    );
  }
  if(body.semestre){
    mat.set(
      {semestre: body.semestre}
    );
  }
  if(body.periodo){
    mat.set(
      {periodo: body.periodo}
    );
  }
  if(body.duracion_en_semanas){
    mat.set(
      {duracion_en_semanas: body.duracion_en_semanas}
    );
  }
  if(body.plan){
    mat.set(
      {plan: body.plan}
    );
  }
  if(body.unidades_de_carga){
    mat.set(
      {unidades_de_carga: body.unidades_de_carga}
    );
  }
  if(body.CIP){
    mat.set(
      {CIP: body.CIP}
    );
  }
  if(body.notas){
    mat.set(
      {notas: body.notas}
    );
  }
}

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
        CIPS: req.body.CIPS,
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
  findById(req, res) {
    return materia.findAll({
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
    console.log(req.params.codigo)
    mat = null;
    try{
      mat = await materia.findOne({
        where: {
          codigo: req.params.codigo,
        },
      });
    }
    catch(e){
      return res.status(400).send(e);
    }
    if(mat == null){
      return res.status(400).send("could not find materia");
    }
    setFields(mat, req.body);
    return mat.save()
    .then((p) => res.status(200).send(p))
    .catch((error) => res.status(400).send(error));
  },
  async delete(req, res){
    console.log("deleting...")
    console.log(req.body)
    console.log(req.params.codigo)
    const mat = await materia.findOne({
      where: { codigo: req.params.codigo },
    });
    if(mat){
      return mat.destroy()
        .then((p)=> res.status(200).send(p))
        .catch((error) => res.status(400).send(error));
    }
    else{
      return res.status(400).send("could not find materia");
    }
  },
};