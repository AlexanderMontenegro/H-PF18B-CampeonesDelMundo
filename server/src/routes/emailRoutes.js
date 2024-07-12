const express = require('express');
const emailRouter = express.Router();
const {
  handleSendAccountCreationEmail,
  handleSendAccountUpdateEmail,
  handleSendAccountDeletionEmail,
  handleSendUserRegistrationEmail,
  handleSendUserDeletionEmail,
  handleSendUserRoleUpdateEmail,
} = require('../handlers/emailHandlers');

emailRouter.post('/send-account-creation', handleSendAccountCreationEmail);
emailRouter.post('/send-account-update', handleSendAccountUpdateEmail);
emailRouter.post('/send-account-deletion', handleSendAccountDeletionEmail);
emailRouter.post('/send-user-registration', handleSendUserRegistrationEmail);
emailRouter.post('/send-user-deletion', handleSendUserDeletionEmail);
emailRouter.post('/send-user-role-update', handleSendUserRoleUpdateEmail);

module.exports = emailRouter;


