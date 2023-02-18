import React from "react";

import { Text } from "@twilio-paste/core/text";
import { Box } from "@twilio-paste/core/box";
import { Button } from "@twilio-paste/core/button";

const AnnouncementBar = ({ message, modalOpenHandler }) => {
  return (
    <Box
      display="inline-flex"
      justifyContent="space-between"
      width="100%"
      alignItems="center"
    >
      <Text as="p" fontSize="fontSize30">
        {message ? message : " No active IVR announcement."}
      </Text>
      <Button variant="secondary" size="small" onClick={modalOpenHandler}>
        Update
      </Button>
    </Box>
  );
};

export default AnnouncementBar;
