const express = require('express');   // const cookieParser = require('cookie-parser');
const env = require('./config/environment');
const logger = require('morgan');

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
// const path = require('path');
// const Todo = require('./models/todo');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
//use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

// setup the chat server 
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server s listning on port 5000');
const path = require('path');

const flash = require('connect-flash');   //Connect-flash needs _"express-session"_ and _"cookie-parser"_ middleware to be able to store flash messages in "session-cookies"
const customMware = require('./config/middleware');

if(env.name == 'development'){
   app.use(sassMiddleware({
      src: path.join(__dirname, env.asset_path, 'scss'),
      dest: path.join(__dirname, env.asset_path, 'css'),
      debug: true,
      outputStyle: 'expanded',
      prefix: '/css'
   }));
}
// app.use(session({
//     secret: 'foo',
//     store: MongoStore.create(options)
//   }));

app.use(express.urlencoded({
   extended:false
}));

app.use(cookieParser());

app.use(express.static(env.asset_path));
// makes the uploads path is awailable to the browser
app.use('/uploads',express.static(__dirname+'/uploads')); // this is necessary to awail img on browser
app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts',true)


// app.use(express.urlencoded());
app.use(express.static('assets'));


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
// app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'./views'));
// app.use(express.urlencoded()); //(use anotation is told that it is => middleware) tha is use for
// app.use(express.static('assets')); // this refers to get the assets files functionality(like all the css,js and images file it asset folder all can be access by this).
app.use(session({
   name:'codeial',
   //TODO change secret being deployment in production mode
   secret:env.session_cookie_key,
   saveUninitialized: false,
   resave:false,
   cookie:{
      maxAge:(1000 * 60 * 100) // specify num in milisecond 
   },
   store: new MongoStore(
      {
         mongooseConnection: db,
         autoRemove: 'disabled'
      },
      function(err){
         console.log(err || 'connect-mongodn setup ok');
      }
   )
 }));

 app.use(passport.initialize());
 app.use(passport.session());
//  app.use(session());

 app.use(passport.setAuthenticatedUser);

 app.use(flash());
 app.use(customMware.setFlash);

 //use express router
app.use('/',require('./routes'));

var todoList = [
   {
      Discription:"Arpan",
      category:"hello",
      date:22/02/2002

   }
   
]

app.get('/',function(req,res){
   // console.log(__dirname);
   // console.log("its from get met",req.myName);

   //here just below in "{}" need all contact this is why need all the names this is why it is empty. else if you want to display all the contacts with the name 'New' like you have to write {name:"New"}
   // Todo.find({}, function(err, Todo){
   //     if(err){
   //         console.log('error is fatching contacts from DB');
   //         return;
   //     }
       return res.render('jal', {
           title: "Todo List",
           Todo_list: todoList
       });
   });
   
// });

app.post('/',function(req,res){

   Todo.create({
      Discription: req.body.Discription,
      category: req.body.Category,
      date: req.body.due_date

   }, function(err,newTodo){
      if(err){
         console.log('error in creating Todo');
         return;
      }
      console.log('******',newTodo);
      return res.redirect('back');
   });
   
});
app.post('/create-todo',function(req,res){
   todoList.push(res.body)
   return res.redirect('back');
})
// app.get('/',function(req,res){
//    Todo.find({},function(err, todo){
//       if(err){
//          console.log('error is fatching ')
//       }
//    })
// })

app.listen(port, function(err){
   if(err){
    // new this to write by help of Back ticks(``).
    console.log(`Error in running the server: ${err}`);
   }
   console.log(`codeial's Server is runnng on port: ${port}`); 
});
