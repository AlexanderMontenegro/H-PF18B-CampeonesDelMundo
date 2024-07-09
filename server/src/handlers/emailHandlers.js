const {
    sendNotificationEmail,
    sendRegistrationConfirmationEmail,
    sendPasswordResetEmail,
  } = require('../services/mailerService');
  
  const handleSendNotificationEmail = async (req, res) => {
    const { email, message } = req.body;
    try {
      await sendNotificationEmail(email, message);
      res.status(200).json({ message: 'Notification email sent' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending notification email' });
    }
  };
  
  const handleSendRegistrationConfirmationEmail = async (req, res) => {
    const { email } = req.body;
    try {
      await sendRegistrationConfirmationEmail(email);
      res.status(200).json({ message: 'Registration confirmation email sent' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending registration confirmation email' });
    }
  };
  
  const handleSendPasswordResetEmail = async (req, res) => {
    const { email, resetLink } = req.body;
    try {
      await sendPasswordResetEmail(email, resetLink);
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending password reset email' });
    }
  };
  
  module.exports = {
    handleSendNotificationEmail,
    handleSendRegistrationConfirmationEmail,
    handleSendPasswordResetEmail,
  };
  