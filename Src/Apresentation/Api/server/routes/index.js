const express = require('express');
const Controller = require('../controller/index');


const Seeds = require('../database/seeds/index')
const router = express.Router();


router.post('/logout', Controller.logout)
router.post('/cookie', Controller.cookies);
router.get('/get-PCD', Controller.getPCD)
router.post('/updateprofile/:id' , Controller.updateProfile)


router.post('/criarvaga/:id', Controller.criarVaga)
  
router.get('/seeds', Seeds.seed);

  module.exports = router;