var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'davythornton@gmail.com',
    pass: 'ibid mkxo fxmo sdzl'
  }
});

var mailOptions = {
  from: 'davythornton@gmail.com',
  to: 'davythornton@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});








