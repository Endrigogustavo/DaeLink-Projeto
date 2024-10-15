const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('../database/daelink-producao-firebase-adminsdk-y99vm-e1d8c6c010.json');

const Controller = require('../controller/index');
const Services = require('../shared/services/index');
const Middlewares = require('../shared/middlewares/index')
const Seeds = require('../database/seeds/index')
const router = express.Router();


router.post('/logout', Middlewares.logout)
router.post('/cookie', Middlewares.cookies);
router.get('/getcookie', Middlewares.getCookie);

router.get('/get-PCD', Services.getPCD)
router.get('/get-all-PCD', Services.getPCDAll)
router.get('/get-company', Services.getEmpresa)
router.get('/get-all-company', Services.getEmpresaAll)
router.get('/get-vaga', Services.getVaga)
router.get('/get-all-vagas', Services.getAllVagas)

router.post('/criarvaga/:id', Controller.criarVaga)
router.post('/updateprofile/:id' , Controller.updateProfile)

  
router.get('/seeds', Seeds.seed);

  module.exports = router;