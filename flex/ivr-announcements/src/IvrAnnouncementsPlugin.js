import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import { Notifications } from "@twilio/flex-ui";
import "./notifications/ivrAnnouncement";

const PLUGIN_NAME = "IvrAnnouncementsPlugin";

export default class IvrAnnouncementsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    Notifications.showNotification("ivrAnnouncement", null);
  }
}
