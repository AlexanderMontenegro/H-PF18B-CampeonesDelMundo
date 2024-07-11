const {
  sendAccountCreationEmail,
  sendAccountUpdateEmail,
  sendAccountDeletionEmail,
  sendUserRegistrationEmail,
  sendUserDeletionEmail,
  sendUserRoleUpdateEmail,
} = require('../services/mailerService');

const handleSendAccountCreationEmail = async (req, res) => {
  const { email, username } = req.body;
  try {
    await sendAccountCreationEmail(email, username);
    res.status(200).json({ message: 'Account creation email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending account creation email' });
  }
};

const handleSendAccountUpdateEmail = async (req, res) => {
  const { email, username } = req.body;
  try {
    await sendAccountUpdateEmail(email, username);
    res.status(200).json({ message: 'Account update email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending account update email' });
  }
};

const handleSendAccountDeletionEmail = async (req, res) => {
  const { email, username } = req.body;
  try {
    await sendAccountDeletionEmail(email, username);
    res.status(200).json({ message: 'Account deletion email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending account deletion email' });
  }
};

const handleSendUserRegistrationEmail = async (req, res) => {
  const { email, username } = req.body;
  try {
    await sendUserRegistrationEmail(email, username);
    res.status(200).json({ message: 'User registration email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending user registration email' });
  }
};

const handleSendUserDeletionEmail = async (req, res) => {
  const { email, username } = req.body;
  try {
    await sendUserDeletionEmail(email, username);
    res.status(200).json({ message: 'User deletion email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending user deletion email' });
  }
};

const handleSendUserRoleUpdateEmail = async (req, res) => {
  const { email, username } = req.body;
  try {
    await sendUserRoleUpdateEmail(email, username);
    res.status(200).json({ message: 'User role update email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending user role update email' });
  }
};

module.exports = {
  handleSendAccountCreationEmail,
  handleSendAccountUpdateEmail,
  handleSendAccountDeletionEmail,
  handleSendUserRegistrationEmail,
  handleSendUserDeletionEmail,
  handleSendUserRoleUpdateEmail,
};
