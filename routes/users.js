// const express = require('express');

// //create router for controller
// const router = express.Router();
// const passport = require('passport')

// //now to access the controller 
// const userController = require('../controllers/users_controller');

// router.get('/profile/:id', passport.checkAuthentication ,userController.profile);    //map the router or access(by) to controller
// router.post('/update/:id', passport.checkAuthentication ,userController.update);
// router.get('/login',userController.login);
// router.get('/sign-up',userController.signUp);
// router.get('/sign-in',userController.signIn);

// router.post('/create', userController.create);
// // router.post('/create-session',userController.createSession); //that was err

// //use passport as a middelware to authenticate
// router.post('/create-session',passport.authenticate('local',{failureRedirect: '/users/sign-in'},
// ), userController.createSession);

// router.get('/sign-out', userController.destroySession);

// router.get('/auth/google', passport.authenticate('google', { scope:['profile', 'email']}));
// router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);   //passport.authincate('<stratergy>',{<scope>})

// //for any further routes, access from here
// // routes.use('/routerName', require('./routerFile'));

// module.exports = router;

// //1sr forword slash"/" ==>['routes/index of routes'] then it breaks in two parts ==> {1. any get with '/' -> request map to home & 2. any (get, post, use) with '/users' -> is further send to users.js  }


const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out', usersController.destroySession);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);



module.exports = router;