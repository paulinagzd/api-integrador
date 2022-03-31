/* Controllers */
const profesorController = require('../controllers/profesor');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Example project did not give you access to the api web services',
  }));
  app.post('/profesor', profesorController.create);
  app.get('/profesor', profesorController.list);
  app.get('/profesor/:nomina', profesorController.find);
};
