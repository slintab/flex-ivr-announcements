import React, { useState } from "react";
import SyncService from "../services/SyncService";

import { Button } from "@twilio-paste/core/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeading,
} from "@twilio-paste/core/modal";
import { Input } from "@twilio-paste/core/input";
import { Label } from "@twilio-paste/core/label";
import { Paragraph } from "@twilio-paste/core";

const AnnouncementModal = ({ open, modalCloseHandler }) => {
  const [newMessage, setNewMessage] = useState("");
  const modalHeadingID = "modal";

  const handleChange = (event) => setNewMessage(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    modalCloseHandler();
    updateAnnouncement(newMessage);
  };

  const updateAnnouncement = async (message) => {
    const result = await SyncService.updateDocument(message);
    
    if (!result) {
      console.log("Error updating announcement.");
    }
  };

  return (
    <Modal
      isOpen={open}
      onDismiss={modalCloseHandler}
      ariaLabelledby={modalHeadingID}
      size="default"
    >
      <ModalHeader>
        <ModalHeading as="h3" id={modalHeadingID}>
          Set IVR announcement
        </ModalHeading>
      </ModalHeader>
      <ModalBody>
        <Paragraph>
          The message will be played to all callers as they interact with the
          IVR before being transferred to Flex.
        </Paragraph>
        <Label htmlFor="message">Set announcement</Label>
        <Input
          aria-describedby="announcement_help_text"
          id="announcement"
          name="announcement"
          type="text"
          onChange={handleChange}
          required
        />
      </ModalBody>
      <ModalFooter>
        <ModalFooterActions>
          <Button variant="secondary" onClick={modalCloseHandler}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Done
          </Button>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
};

export default AnnouncementModal;
