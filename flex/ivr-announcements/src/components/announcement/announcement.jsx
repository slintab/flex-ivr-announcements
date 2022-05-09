import React, { useEffect } from "react";
import { Box, Button, Typography, Modal, TextField } from "@material-ui/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Announcement({ syncClient, syncDocName }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleOpen = () => setOpen(true);
  
  const handleClose = () => setOpen(false);

  const handleChange = (event) => setMessage(event.target.value);

  const updateAnnouncement = async (client, doc, message) => {
    const syncDoc = await client.document(doc);
    const content = syncDoc.data;

    content.announcement = message;

    syncDoc.update(content);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    handleClose();
    updateAnnouncement(syncClient, syncDocName, message)
  };

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
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography align="right" sx={{ pr: 10 }}>
          {message ? message : " No active IVR announcement."}
        </Typography>
        <Button variant="outlined" size="small" onClick={handleOpen}>
          Update
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Set IVR Announcement
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="outlined-name"
                label="Announcement..."
                value={message}
                onChange={handleChange}
              ></TextField>
              <Box textAlign="center" sx={{ mt: 2 }}>
                <Button disableElevation variant="outlined" type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
