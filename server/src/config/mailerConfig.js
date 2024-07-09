const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email", // Puedes usar tu propio servicio SMTP
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // Configura tus variables de entorno
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;
