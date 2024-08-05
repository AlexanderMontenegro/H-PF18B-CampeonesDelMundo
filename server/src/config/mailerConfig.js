const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve(__dirname, '../views/'),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, '../views/'),
  extName: '.hbs',
};

transporter.use('compile', hbs(handlebarOptions));

module.exports = transporter;

