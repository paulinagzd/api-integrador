const Sequelize = require('sequelize');
const { profesor } = require('../models');

function validateProfesor(profesor){
  if(profesor.nomina && profesor.nomina.length != 9){
    return `Nomina ${profesor.nomina} is not valid. Length must be exaclty 9 characters.`;
  }
  if (profesor.nomina && profesor.nomina[0] != "L"){
    return `Nomina ${profesor.nomina} is not valid. It must begin with 'L'.`;
  }
  if (profesor.correo_institucional && !profesor.correo_institucional.includes("@")){
    return `Email ${profesor.correo_institucional} not valid. It must contain '@'.`;
  } 
  if(profesor.correo_personal && !profesor.correo_personal.includes("@")){
    return `Email ${profesor.correo_personal} not valid. It must contain '@'.`;
  }
  if(profesor.telefono && isNaN(profesor.telefono)){
    return `Phone number ${profesor.telefono} is not valid. It is not numeric.`
  }
  if(profesor.unidades_de_carga_max && (profesor.unidades_de_carga_max < 0 || profesor.unidades_de_carga_max > 20)){
    return `Unidades de carga ${profesor.unidades_de_carga_max} is not valid. It must be within the range of 0-20.`
  }
  return "";
}

//TODO: Add validation
function setFields(prof, body){
  if(body.nombre){
    prof.set(
      {nombre: body.nombre}
    );
  }
  if(body.correo_institucional){
    prof.set(
      {correo_institucional: body.correo_institucional}
    );
  }
  if(body.correo_personal){
    prof.set(
      {correo_personal: body.correo_personal}
    );
  }
  if(body.telefono){
    prof.set(
      {telefono: body.telefono}
    );
  }
  if(body.estatus_interno){
    prof.set(
      {estatus_interno: body.estatus_interno}
    );
  }
  if(body.tipo){
    prof.set(
      {tipo: body.tipo}
    );
  }
  if(body.clase_en_ingles){
    prof.set(
      {clase_en_ingles: body.clase_en_ingles}
    );
  }
  if(body.unidades_de_carga_max){
    prof.set(
      {unidades_de_carga_max: body.unidades_de_carga_max}
    );
  }
  if(body.empresa_donde_trabaja){
    prof.set(
      {empresa_donde_trabaja: body.empresa_donde_trabaja}
    );
  }
  if(body.notas){
    prof.set(
      {notas: body.notas}
    );
  }
}

module.exports = {
  create(req, res) {
    console.log(req.body);
    valid = validateProfesor(req.body);
    if(valid != ""){
      return res.status(400).send(valid);
    }
    return profesor
      .create({
        nomina: req.body.nomina,
        nombre: req.body.nombre,
        correo_institucional: req.body.correo_institucional,
        correo_personal: req.body.correo_personal,
        telefono: req.body.telefono,
        estatus_interno: req.body.estatus_interno,
        tipo: req.body.tipo,
        clase_en_ingles: req.body.clase_en_ingles,
        unidades_de_carga_max: req.body.unidades_de_carga_max,
        empresa_donde_trabaja: req.body.empresa_donde_trabaja,
        notas: req.body.notas
      })
      .then((p) => {
        res.status(200).send(p)
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error)});
  },

  list(_, res) {
    return profesor.findAll({})
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    return profesor.findAll({
      where: {
        nomina: req.body.nomina,
      },
    })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  findByTipoDeContrato(req, res) {
    console.log("entering...")
    return profesor.findAll({
      where: {
        tipo: req.params.tipo,
      },
    })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  async set(req, res){
    console.log("updating...")
    console.log(req.body)
    console.log(req.params.nomina)
    prof = null;
    try{
      prof = await profesor.findOne({
        where: {
          nomina: req.params.nomina,
        },
      });
    }
    catch(e){
      return res.status(400).send(e);
    }
    if(prof == null){
      return res.status(400).send("could not find professor");
    }
    setFields(prof, req.body);
    return prof.save()
    .then((p) => res.status(200).send(p))
    .catch((error) => res.status(400).send(error));
  },
};
