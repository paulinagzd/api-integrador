/* Controllers */
const profesorController = require('../controllers/profesor');
const materiaController = require('../controllers/materia');
const gradoAcademicoController = require('../controllers/grado_academico');
const temaEspecialidadController = require('../controllers/tema_especialidad');
const temaEspecialidadProfesorController = require('../controllers/tema_especialidad_profesor');
const maestriaAceptadaController = require('../controllers/maestria_aceptada');
const materiaImpartidaController = require('../controllers/materia_impartida');
const materiaBloqueadaController = require('../controllers/materia_bloqueada');
const ecoaController = require('../controllers/ecoa');


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Example project did not give you access to the api web services',
  }));
  app.post('/profesor', profesorController.create);
  app.get('/profesor', profesorController.list);
  app.get('/profesor/:nomina', profesorController.find);
  app.put('/profesor/:nomina', profesorController.set);

  app.post('/materia', materiaController.create);
  app.get('/materia', materiaController.list);
  app.get('/materia/:codigo', materiaController.find);
  app.put('/materia/:codigo', materiaController.set);

  app.post('/grado_academico', gradoAcademicoController.create);
  app.get('/grado_academico', gradoAcademicoController.list);
  app.get('/grado_academico/:id', gradoAcademicoController.find);
  app.put('/grado_academico/:id', gradoAcademicoController.set);

  app.post('/tema_especialidad', temaEspecialidadController.create);
  app.get('/tema_especialidad', temaEspecialidadController.list);
  app.get('/tema_especialidad/:id', temaEspecialidadController.find);
  // No creo que sea necesario un editor de este tipo ya que el único 
  // elemento es el nombre. Más bien se deberá de borrar y agregar uno nuevo.

  app.post('/tema_especialidad_profesor', temaEspecialidadProfesorController.create);
  app.get('/tema_especialidad_profesor', temaEspecialidadProfesorController.list);
  app.get('/tema_especialidad_profesor/:id', temaEspecialidadProfesorController.find);
  app.put('/tema_especialidad_profesor/:id', temaEspecialidadProfesorController.set);

  app.post('/maestria_aceptada', maestriaAceptadaController.create);
  app.get('/maestria_aceptada', maestriaAceptadaController.list);
  app.get('/maestria_aceptada/:id', maestriaAceptadaController.find);
    // No creo que sea necesario un editor de este tipo ya que el único 
  // elemento es el nombre. Más bien se deberá de borrar y agregar uno nuevo.

  app.post('/materia_impartida', materiaImpartidaController.create);
  app.get('/materia_impartida', materiaImpartidaController.list);
  app.get('/materia_impartida/:id', materiaImpartidaController.find);
  app.put('/materia_impartida/:id', materiaImpartidaController.set);

  app.post('/materia_bloqueada', materiaBloqueadaController.create);
  app.get('/materia_bloqueada', materiaBloqueadaController.list);
  app.get('/materia_bloqueada/:id', materiaBloqueadaController.find);
  // No es necesaria la edición sólo la eliminación.

  app.post('/ecoa', ecoaController.create);
  app.get('/ecoa', ecoaController.list);
  app.get('/ecoa/:id', ecoaController.find);
  app.put('/ecoa/:id', ecoaController.set);

};
