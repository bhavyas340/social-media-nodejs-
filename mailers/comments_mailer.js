const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('Inside newComment mailer', comment)
    // let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
       from: 'bhavyas340@gmail.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: '<h1>Yup,Your comment is now published</h1>'
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}