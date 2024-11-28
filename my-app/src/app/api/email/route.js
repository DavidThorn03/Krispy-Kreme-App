export async function GET(req, res) {
  var nodemailer = require('nodemailer');

  const { searchParams } = new URL(req.url);
  const user = searchParams.get('user');
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'davythornton@gmail.com',
      pass: 'enter password here'
    }
  });
  
  var mailOptions = {
    from: 'davythornton@gmail.com',
    to: user,
    subject: 'KremeKrispy Order',
    text: 'Thank you for placing an order with Krispy Kreme. Your order will be ready for collection in 15 minutes.'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  return Response.json({message: 'Email sent'})

}







