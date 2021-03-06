/* Controllers */
const profesorController = require('../controllers/profesor');
const materiaController = require('../controllers/materia');
const gradoAcademicoController = require('../controllers/grado_academico');
const temaEspecialidadController = require('../controllers/tema_especialidad');
const temaEspecialidadProfesorController = require('../controllers/tema_especialidad_profesor');
const maestriaAceptadaController = require('../controllers/maestria_aceptada');
const materiaImpartidaController = require('../controllers/materia_impartida');
const materiaBloqueadaController = require('../controllers/materia_bloqueada');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Example project did not give you access to the api web services',
  }));
  app.post('/profesor', profesorController.create);
  app.get('/profesor', profesorController.list);
  app.get('/profesor/:nomina', profesorController.find);
  app.get('/profesor/id/:id', profesorController.findById);
  app.get('/profesor/porContrato/:tipo', profesorController.findByTipoDeContrato);
  app.put('/profesor/:nomina', profesorController.set);
  app.delete('/profesor/:nomina', profesorController.delete);

  app.post('/materia', materiaController.create);
  app.get('/materia', materiaController.list);
  app.get('/materia/:codigo', materiaController.find);
  app.get('/materia/id/:id', materiaController.findById);
  app.put('/materia/:codigo', materiaController.set);
  app.delete('/materia/:codigo', materiaController.delete);

  app.post('/grado_academico', gradoAcademicoController.create);
  app.get('/grado_academico', gradoAcademicoController.list);
  app.get('/grado_academico/:id', gradoAcademicoController.find);
  app.get('/grado_academico/profesor/:profeId', gradoAcademicoController.findGradoByProfesor);
  app.put('/grado_academico/:id', gradoAcademicoController.set);
  app.delete('/grado_academico/:id', gradoAcademicoController.delete);

  app.post('/tema_especialidad', temaEspecialidadController.create);
  app.get('/tema_especialidad', temaEspecialidadController.list);
  app.get('/tema_especialidad/:id', temaEspecialidadController.find);
  app.delete('/tema_especialidad/:id', temaEspecialidadController.delete);
  // No creo que sea necesario un editor de este tipo ya que el ??nico
  // elemento es el nombre. M??s bien se deber?? de borrar y agregar uno nuevo.

  app.post('/tema_especialidad_profesor', temaEspecialidadProfesorController.create);
  app.get('/tema_especialidad_profesor', temaEspecialidadProfesorController.list);
  app.get('/tema_especialidad_profesor/:id', temaEspecialidadProfesorController.find);
  app.get('/tema_especialidad_profesor/tema/:temaId', temaEspecialidadProfesorController.findProfesoresWithEspecialidad);
  app.get('/tema_especialidad_profesor/profesor/:profeId', temaEspecialidadProfesorController.findEspecialidadByProfesor);
  app.put('/tema_especialidad_profesor/:id', temaEspecialidadProfesorController.set);
  app.delete('/tema_especialidad_profesor/:id', temaEspecialidadProfesorController.delete);

  app.post('/maestria_aceptada', maestriaAceptadaController.create);
  app.get('/maestria_aceptada', maestriaAceptadaController.list);
  app.get('/maestria_aceptada/:id', maestriaAceptadaController.find);
  app.delete('/maestria_aceptada/:id', maestriaAceptadaController.delete);
  // No creo que sea necesario un editor de este tipo ya que el ??nico
  // elemento es el nombre. M??s bien se deber?? de borrar y agregar uno nuevo.

  app.post('/materia_impartida', materiaImpartidaController.create);
  app.get('/materia_impartida', materiaImpartidaController.list);
  app.get('/materia_impartida/:id', materiaImpartidaController.find);
  app.get('/materia_impartida/profesor/:profesorId', materiaImpartidaController.findMateriasWithProfesor);
  app.get('/materia_impartida/materia/:materiaId', materiaImpartidaController.findProfesoresWithMateria);
  app.put('/materia_impartida/:id', materiaImpartidaController.set);
  app.delete('/materia_impartida/:id', materiaImpartidaController.delete);

  app.post('/materia_bloqueada', materiaBloqueadaController.create);
  app.get('/materia_bloqueada', materiaBloqueadaController.list);
  app.get('/materia_bloqueada/profesor/:profesorId', materiaBloqueadaController.findMateriasWithProfesor);
  app.get('/materia_bloqueada/:id', materiaBloqueadaController.find);
  app.delete('/materia_bloqueada/:id', materiaBloqueadaController.delete);
  // No es necesaria la edici??n s??lo la eliminaci??n.
};
