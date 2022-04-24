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

module.exports = {
  create(req, res) {
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
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return profesor.findAll({})
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    return profesor.findAll({
      where: {
        nomina: req.params.nomina,
      },
    })
      .then((p) => res.status(200).send(p))
      .catch((error) => res.status(400).send(error));
  },
  
  update(req, res){
    console.log("updating...")
    return profesor.update( 
      {nombre: req.body.nombre},
      {where: {nomina: req.params.nomina}}
    )
    .then((p) => res.status(200).send(p))
    .catch((error) => res.status(400).send(error));
  },
};
