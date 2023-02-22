// const { findById } = require('../models/post');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');



module.exports.profile = function(req,res){
    if(req.user){// This added wall between refreshing btwn directly get into profile page
        User.findById(req.params.id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title:'User Profile',
                    profile_user:user
                })
            }
            // return res.redirect('/users/sign-in');
        });
    }else{
        return res.redirect('/users/sign-in');
    }
};
module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res, function(err){
                if(err){
                    console.log('*****multer Error: ', err);
                    // console.log(req.file);
                }
               
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        // this unlinkSync function give facility to
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));       //__dirname current directary and "user.avatar" just stores uploads/users/avatars
                    }
                    // this is saving the path of the uploaded file into the avtar field in user 
                    user.avatar = User.avatarPath+ '/' + req.file.filename;
                }
                user.save();
                
                return res.redirect('back')
                
            })
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized!')
        return res.status(401).send('Unauthorized');
    }
}

module.exports.login = function(req,res){
    return res.end(
        '<h1 style="    text-align: center; background-color: aquamarine;  border-radius: 15px;">Please go to login first</h1>'
    );
};

//Sign Up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('./user_sign_up',{
        title:"Codeial | Sign Up"
    })
}

//Sign In page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
   console.log(req.cookies);
    return res.render('./user_sign_in',{
        title:"Codeial | Sign In"
    });
};
//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
         console.log('password does not match');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err,user){
        if (err) {
            console.log('error in finding user in signing up');
            return
        }
        if (!user){
            User.create(req.body, function(err, user) {
                if(err){console.log('error in creating user while signing up'); return}

                // console.log('frpm here redirect should be possible');
                return res.redirect('/users/sign-in');
            })
        }
        else {
            
            return res.redirect('back');
        }
    });
}
//Sign in and create session for user 
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Sucessfully');
    return res.redirect('/');
}

// module.exports.createSession = function(req,res){
//     //TODO later
//     console.log(req.body);
//     //find the user   // steps to authintacate
//     User.findOne({email:req.body.email}, function(err,user){
        
//         if(err){
//             console.log('err in finding user in signing in'); return}
//             //handel user found
//             console.log(user);
//             if(user){
//                 //handel passwork which does't match
//                 if(user.password != req.body.password){
//                     return res.redirect('back');
//                 }

//                  // handel session creation
//                  res.cookie('user_id',user._id);
//                  return res.redirect('/users/profile');
//             }else{
//                 console.log('Not found')
//                 return res.redirect('back');
//             }
//     });
// }

    

   
// }

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        
        if(err){
            return next(err);
        }
        req.flash('success','You have logged out!');
        // req.flash('success', 'You have logged out');
        return res.redirect('/users/sign-in');
    })//using passport.js
    // return res.redirect('/');
}