const {
  sendAccountCreationEmail,
  sendAccountUpdateEmail,
  sendAccountDeletionEmail,
} = require('../services/mailerService');

const handleSendAccountCreationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    await sendAccountCreationEmail(email);
    res.status(200).json({ message: 'Account creation email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending account creation email' });
  }
};

const handleSendAccountUpdateEmail = async (req, res) => {
  const { email } = req.body;
  try {
    await sendAccountUpdateEmail(email);
    res.status(200).json({ message: 'Account update email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending account update email' });
  }
};

const handleSendAccountDeletionEmail = async (req, res) => {
  const { email } = req.body;
  try {
    await sendAccountDeletionEmail(email);
    res.status(200).json({ message: 'Account deletion email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending account deletion email' });
  }
};

module.exports = {
  handleSendAccountCreationEmail,
  handleSendAccountUpdateEmail,
  handleSendAccountDeletionEmail,
};
