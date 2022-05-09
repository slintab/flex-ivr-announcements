const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(function (context, event, callback) {
  const ACCOUNT_SID = context.ACCOUNT_SID;
  const SERVICE_SID = context.SYNC_SERVICE_SID;
  const API_KEY = context.API_KEY;
  const API_SECRET = context.API_SECRET;

  const IDENTITY = "flex-ivr-announcements";

  const AccessToken = Twilio.jwt.AccessToken;
  const SyncGrant = AccessToken.SyncGrant;

  const syncGrant = new SyncGrant({
    serviceSid: SERVICE_SID,
  });

  const accessToken = new AccessToken(ACCOUNT_SID, API_KEY, API_SECRET);

  accessToken.addGrant(syncGrant);
  accessToken.identity = IDENTITY;

  const response = new Twilio.Response();

  // Set cross origin headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Set headers in response
  response.setBody({ token: accessToken.toJwt() });
  response.setHeaders(headers);

  callback(null, response);
});
