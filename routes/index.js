const jwt = require('jsonwebtoken');
/* Controllers */
const profesorController = require('../controllers/profesor');
const materiaController = require('../controllers/materia');
const gradoAcademicoController = require('../controllers/grado_academico');
const temaEspecialidadController = require('../controllers/tema_especialidad');
const temaEspecialidadProfesorController = require('../controllers/tema_especialidad_profesor');
const maestriaAceptadaController = require('../controllers/maestria_aceptada');
const materiaImpartidaController = require('../controllers/materia_impartida');
const materiaBloqueadaController = require('../controllers/materia_bloqueada');
const userController = require('../controllers/users');

function validateToken(req, res, next) {
  const token = req.body.token;
  if (token == null) res.sendStatus(400).send("Token not present")
  jwt.verify(token, "secret", (err, user) => {
      if (err) { 
        res.status(403).send("Token invalid")
      }
      else {
        req.user = user
        next() //proceed to the next action in the calling function
      }
    }) //end of jwt.verify()
  } //end of function



module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Example project did not give you access to the api web services',
  }));
  app.post('/profesor', validateToken, profesorController.create);
  app.get('/profesor', validateToken, profesorController.list);
  app.get('/profesor/:nomina', validateToken, profesorController.find);
  app.get('/profesor/id/:id', validateToken, profesorController.findById);
  app.get('/profesor/porContrato/:tipo', validateToken, profesorController.findByTipoDeContrato);
  app.put('/profesor/:nomina', validateToken, profesorController.set);
  app.delete('/profesor/:nomina', validateToken, profesorController.delete);

  app.post('/materia', validateToken, materiaController.create);
  app.get('/materia', validateToken,  materiaController.list);
  app.get('/materia/:codigo', validateToken, materiaController.find);
  app.get('/materia/id/:id', validateToken, materiaController.findById);
  app.put('/materia/:codigo', validateToken, materiaController.set);
  app.delete('/materia/:codigo', validateToken, materiaController.delete);

  app.post('/grado_academico', validateToken, gradoAcademicoController.create);
  app.get('/grado_academico', validateToken, gradoAcademicoController.list);
  app.get('/grado_academico/:id', validateToken, gradoAcademicoController.find);
  app.put('/grado_academico/:id', validateToken, gradoAcademicoController.set);
  app.delete('/grado_academico/:id', validateToken,gradoAcademicoController.delete);


  app.delete('/grado_academico/:id', validateToken, gradoAcademicoController.delete);
  app.delete('/grado_academico/:id', validateToken,gradoAcademicoController.delete);
  app.post('/tema_especialidad', validateToken, temaEspecialidadController.create);
  app.get('/tema_especialidad', validateToken, temaEspecialidadController.list);
  app.get('/tema_especialidad/:id', validateToken, temaEspecialidadController.find);
  app.delete('/tema_especialidad/:id', validateToken, temaEspecialidadController.delete);
  // No creo que sea necesario un editor de este tipo ya que el único 
  // elemento es el nombre. Más bien se deberá de borrar y agregar uno nuevo.

  app.post('/tema_especialidad_profesor', validateToken, temaEspecialidadProfesorController.create);
  app.get('/tema_especialidad_profesor', validateToken, temaEspecialidadProfesorController.list);
  app.get('/tema_especialidad_profesor/:id', validateToken, temaEspecialidadProfesorController.find);
  app.get('/tema_especialidad_profesor/tema/:temaId', validateToken, temaEspecialidadProfesorController.findProfesoresWithEspecialidad);
  app.put('/tema_especialidad_profesor/:id', validateToken, temaEspecialidadProfesorController.set);
  app.delete('/tema_especialidad_profesor/:id', validateToken, temaEspecialidadProfesorController.delete);

  app.post('/maestria_aceptada', validateToken, maestriaAceptadaController.create);
  app.get('/maestria_aceptada', validateToken, maestriaAceptadaController.list);
  app.get('/maestria_aceptada/:id', validateToken, maestriaAceptadaController.find);
  app.delete('/maestria_aceptada/:id', validateToken, maestriaAceptadaController.delete);
    // No creo que sea necesario un editor de este tipo ya que el único 
  // elemento es el nombre. Más bien se deberá de borrar y agregar uno nuevo.

  app.post('/materia_impartida', validateToken, materiaImpartidaController.create);
  app.get('/materia_impartida', validateToken, materiaImpartidaController.list);
  app.get('/materia_impartida/:id', validateToken, materiaImpartidaController.find);
  app.get('/materia_impartida/profesor/:profesorId', validateToken, materiaImpartidaController.findMateriasWithProfesor);
  app.get('/materia_impartida/materia/:materiaId', validateToken, materiaImpartidaController.findProfesoresWithMateria);
  app.put('/materia_impartida/:id', validateToken, materiaImpartidaController.set);
  app.delete('/materia_impartida/:id', validateToken, materiaImpartidaController.delete);

  app.post('/materia_bloqueada', validateToken, materiaBloqueadaController.create);
  app.get('/materia_bloqueada', validateToken, materiaBloqueadaController.list);
  app.get('/materia_bloqueada/:id', validateToken, materiaBloqueadaController.find);
  app.delete('/materia_bloqueada/:id', validateToken, materiaBloqueadaController.delete);
  // No es necesaria la edición sólo la eliminación.

  app.post('/user/register', userController.create)
  app.get('/user/login', userController.authenticate)
  app.put('/user/changePwd', validateToken, userController.set)
};
