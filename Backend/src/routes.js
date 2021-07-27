const express = require('express');  
const ongsController = require('./controller/ongsController');
const incidentsController = require('./controller/IncidentsController');
const profileController = require('./controller/ProfieController');
const sessionController = require('./controller/SessionsController');

const routes = express.Router();

routes.get('/profile', profileController.index);
routes.post('/session', sessionController.create);

routes.get('/ongs', ongsController.list);
routes.get('/ongs/:idOng', ongsController.list);
routes.post('/ongs', ongsController.create);
routes.post('/ongs/update', ongsController.update);
routes.delete('/ongs/delete', ongsController.delete);

routes.get('/incidents', incidentsController.list);
routes.post('/incidents', incidentsController.create);
routes.post('/incidents/update/:id', incidentsController.update);
routes.delete('/incidents/delete/:id', incidentsController.delete);

module.exports = routes;