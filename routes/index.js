// // that will be use for further routes which style as "app.listen('/url'" <== this part is called route ande further to controller ==> ",function{})"
// const express = require('express');

// const router = express.Router();
// const homeController = require('../controllers/home_controller'); 
// const userController = require('../controllers/users_controller');
// // const { route } = require('./comments');


// console.log('router loded');



// router.get('/', homeController.home);
// // router.get('/about', homeController.about);
// router.use('/users',require('./users'));
// router.post('/create-todo', homeController.home);
// router.use('/posts', require('./posts')); 
// router.use('/comments', require('./comments')); // here is other way to write "require('../routes/comments.js')"
// router.use('/api',require('./api'));
// router.use('/likes', require('./likes'));

// //for any further routers, access from here
// // router.use('./routerName', require('./routerfile'));
// // router.get('/post', homeController.post);
// // router.get('/login', userController.login);
// // console.log('router loded2');
// module.exports = router;

const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));


router.use('/api', require('./api'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;
