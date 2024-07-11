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

const sendAccountCreationEmail = (to, username) => {
  const subject = 'Account Creation';
  const template = 'accountCreation';
  const context = { email: to, username };
  sendMail(to, subject, template, context);
};

const sendAccountUpdateEmail = (to, username) => {
  const subject = 'Account Update';
  const template = 'accountUpdate';
  const context = { email: to, username };
  sendMail(to, subject, template, context);
};

const sendAccountDeletionEmail = (to, username) => {
  const subject = 'Account Deletion';
  const template = 'accountDeletion';
  const context = { email: to, username };
  sendMail(to, subject, template, context);
};

const sendUserRegistrationEmail = (to, username) => {
  const subject = 'Registro Exitoso';
  const template = 'registerUser';
  const context = { username };
  sendMail(to, subject, template, context);
};

const sendUserDeletionEmail = (to, username) => {
  const subject = 'Cuenta Eliminada';
  const template = 'deleteUser';
  const context = { username };
  sendMail(to, subject, template, context);
};

const sendUserRoleUpdateEmail = (to, username) => {
  const subject = 'Actualización de Rol';
  const template = 'updateUserRole';
  const context = { username };
  sendMail(to, subject, template, context);
};

module.exports = {
  sendAccountCreationEmail,
  sendAccountUpdateEmail,
  sendAccountDeletionEmail,
  sendUserRegistrationEmail,
  sendUserDeletionEmail,
  sendUserRoleUpdateEmail,
};

