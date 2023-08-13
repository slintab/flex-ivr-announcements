exports.handler = async (context, event, callback) => {
  const syncDocumentName = context.DOCUMENT_NAME;
  const syncServiceSid = context.SYNC_SERVICE_SID;

  if (!(syncDocumentName && syncServiceSid)) {
    return callback("Missing parameters");
  }

  const syncClient = Runtime.getSync({ serviceName: syncServiceSid });
  const document = await syncClient.documents(syncDocumentName).fetch();
  const announcement = document.data.announcement;

  if (announcement === "") {
    return callback("No announcement");
  }

  return callback(null, document.data);
};
