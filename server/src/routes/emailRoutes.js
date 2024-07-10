const express = require('express');
const emailRouter = express.Router();
const {
  handleSendAccountCreationEmail,
  handleSendAccountUpdateEmail,
  handleSendAccountDeletionEmail,
} = require('../handlers/emailHandlers');

emailRouter.post('/send-account-creation', handleSendAccountCreationEmail);
emailRouter.post('/send-account-update', handleSendAccountUpdateEmail);
emailRouter.post('/send-account-deletion', handleSendAccountDeletionEmail);

module.exports = emailRouter;

