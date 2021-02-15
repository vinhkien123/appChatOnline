const nodemailer = require('nodemailer');
verify = function (to, subject, htmlContent) {
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tien.tesosoft@gmail.com',
        pass: 'tien100419982000'
    }
});

var mailOptions = {
    from: 'tien.tesosoft@gmail.com',
    to: to,
    subject: subject,
    text: htmlContent
};

    transporter.sendMail(mailOptions, function (error) {
        if (error)
        { throw new Error(error) }
    });
}


module.exports.verify = verify