const transporter = require('../config/mailerConfig');

const sendMail = async (to, subject, template, context) => {
  try {
    const info = await transporter.sendMail({
      from: '"Campeones Del Mundo" <your-email@example.com>',
      to,
      subject,
      template,
      context,
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendAccountCreationEmail = (to) => {
  const subject = 'Account Creation';
  const template = 'accountCreation';
  const context = { email: to };
  sendMail(to, subject, template, context);
};

const sendAccountUpdateEmail = (to) => {
  const subject = 'Account Update';
  const template = 'accountUpdate';
  const context = { email: to };
  sendMail(to, subject, template, context);
};

const sendAccountDeletionEmail = (to) => {
  const subject = 'Account Deletion';
  const template = 'accountDeletion';
  const context = { email: to };
  sendMail(to, subject, template, context);
};

module.exports = {
  sendAccountCreationEmail,
  sendAccountUpdateEmail,
  sendAccountDeletionEmail,
};

