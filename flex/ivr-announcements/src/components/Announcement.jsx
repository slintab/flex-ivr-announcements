import React, { useState, useEffect } from "react";
import { Theme } from "@twilio-paste/core/theme";
import { Box } from "@twilio-paste/core/box";
import SyncService from "../services/SyncService";

import AnnouncementBar from "./AnnouncementBar";
import AnnouncementModal from "./AnnouncementModal";

const Announcement = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function setAnnouncement() {
      const syncDoc = await SyncService.getDocument();

      if (!syncDoc) {
        console.log("Error fetching announcement.");
        return;
      }

      setMessage(syncDoc.data.announcement);

      syncDoc.on("updated", (event) => {
        setMessage(event.data.announcement);
      });
    }

    setAnnouncement();
  }, []);

  return (
    <Theme.Provider theme="default">
      <Box>
        <AnnouncementBar message={message} modalOpenHandler={handleOpen} />
        <AnnouncementModal open={open} modalCloseHandler={handleClose} />
      </Box>
    </Theme.Provider>
  );
};

export default Announcement;
