const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(function (context, event, callback) {
  const { ACCOUNT_SID, SYNC_SERVICE_SID, API_KEY, API_SECRET } = context;
  const IDENTITY = "flex-ivr-announcements";
  const AccessToken = Twilio.jwt.AccessToken;
  const SyncGrant = AccessToken.SyncGrant;

  const syncGrant = new SyncGrant({
    serviceSid: SYNC_SERVICE_SID,
  });

  const accessToken = new AccessToken(ACCOUNT_SID, API_KEY, API_SECRET);
  accessToken.addGrant(syncGrant);
  accessToken.identity = IDENTITY;

  const response = new Twilio.Response();
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  response.setHeaders(headers);
  response.setBody({ token: accessToken.toJwt() });

  callback(null, response);
});
