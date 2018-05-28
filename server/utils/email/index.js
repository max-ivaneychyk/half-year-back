let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tt5559182@gmail.com',
        pass: '123+++qwe'
    }
});

const FROM = 'sender@email.com';
const HTML = '<p>Your html here</p>';
const SUBJECT = 'Subject of your email';

module.exports = {
	sendMail: function ({from = FROM, to = [], html = HTML, subject = SUBJECT} = {}) {
		return new Promise((resolve, reject) => {
			let mailOptions = {
			    from, // sender address
			    to: to.join(', '), // list of receivers
			    subject,
			    html
			};

		    transporter.sendMail(mailOptions, function (err, info) {
            	if (err) return reject(err);

            	resolve(info);
			});
        });
	}
};

