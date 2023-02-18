import React, { useState, useEffect } from "react";
import { Theme } from "@twilio-paste/core/theme";
import { Box } from "@twilio-paste/core/box";

import AnnouncementBar from "./AnnouncementBar";
import AnnouncementModal from "./AnnouncementModal";

const Announcement = ({ syncClient, syncDocName }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function fetchAnnouncement() {
      const syncDoc = await syncClient.document(syncDocName);
      const content = syncDoc.data;

      setMessage(content.announcement);

      syncDoc.on("updated", (event) => {
        setMessage(event.data.announcement);
      });
    }

    fetchAnnouncement();
  }, []);

  return (
    <Theme.Provider theme="default">
      <Box>
        <AnnouncementBar message={message} modalOpenHandler={handleOpen} />
        <AnnouncementModal
          syncClient={syncClient}
          syncDocName={syncDocName}
          open={open}
          modalCloseHandler={handleClose}
        />
      </Box>
    </Theme.Provider>
  );
};

export default Announcement;
