const express = require('express');
const emailRouter = express.Router();
const {
  handleSendNotificationEmail,
  handleSendRegistrationConfirmationEmail,
  handleSendPasswordResetEmail,
} = require('../handlers/emailHandlers');

emailRouter.post('/send-notification', handleSendNotificationEmail);
emailRouter.post('/send-registration-confirmation', handleSendRegistrationConfirmationEmail);
emailRouter.post('/send-password-reset', handleSendPasswordResetEmail);

module.exports = emailRouter;
