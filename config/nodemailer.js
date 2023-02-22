const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')
const env = require('./environment');

let transporter = nodemailer.createTransport(env.smtp);

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth:{
//         user: 'bhavyas340@gmail.com',
//         pass: 'mnnnwlwfakaxtabd'
//     }
// }
// )

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    console.log(__dirname);

    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template', err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}