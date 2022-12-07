// that will be use for further routes which style as "app.listen('/url'" <== this part is called route ande further to controller ==> ",function{})"
const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller'); 

console.log('router loded');

router.get('/', homeController.home);
router.get('/about', homeController.about)

module.exports = router;
