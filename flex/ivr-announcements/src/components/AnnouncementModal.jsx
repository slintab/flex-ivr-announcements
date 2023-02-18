import React, { useState } from "react";

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

const AnnouncementModal = ({
  syncClient,
  syncDocName,
  open,
  modalCloseHandler,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const modalHeadingID = "modal";

  const handleChange = (event) => setNewMessage(event.target.value);

  const updateAnnouncement = async (client, doc, message) => {
    const syncDoc = await client.document(doc);
    const content = syncDoc.data;

    content.announcement = message;

    syncDoc.update(content);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    modalCloseHandler();
    updateAnnouncement(syncClient, syncDocName, newMessage);
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
