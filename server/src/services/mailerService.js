const transporter = require('../config/mailerConfig');

const sendMail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Your Project Name" <your-email@example.com>', // Remitente
      to,
      subject,
      text,
      html,
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendNotificationEmail = (to, message) => {
  sendMail(to, 'Notification', message, `<b>${message}</b>`);
};

const sendRegistrationConfirmationEmail = (to) => {
  const message = 'Thank you for registering!';
  sendMail(to, 'Registration Confirmation', message, `<b>${message}</b>`);
};

const sendPasswordResetEmail = (to, resetLink) => {
  const message = `Click the following link to reset your password: ${resetLink}`;
  sendMail(to, 'Password Reset', message, `<b>${message}</b>`);
};

module.exports = {
  sendNotificationEmail,
  sendRegistrationConfirmationEmail,
  sendPasswordResetEmail,
};
