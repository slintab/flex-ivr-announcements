import React from "react";
import { VERSION, NotificationType, Notifications } from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import { SyncClient } from "twilio-sync";

import reducers, { namespace } from "./states";
import Announcement from "./components/announcement/announcement";
import config from "./config";

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
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    const createSyncClient = async () => {
      const body = {
        Token: manager.store.getState().flex.session.ssoTokenPayload.token,
      };

      const options = {
        method: "POST",
        body: new URLSearchParams(body),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      };

      const resp = await fetch(config.SYNC_TOKEN_URL, options);
      const result = await resp.json();

      return new SyncClient(result.token);
    };

    const syncClient = await createSyncClient();

    flex.Notifications.registerNotification({
      id: "ivrAnnouncement",
      closeButton: true,
      timeout: 0,
      type: NotificationType.information,
    });

    const notification =
      Notifications.registeredNotifications.get("ivrAnnouncement");
    notification.content = (
      <Announcement
        syncClient={syncClient}
        syncDocName={config.SYNC_DOC_NAME}
      />
    );

    Notifications.showNotification("ivrAnnouncement", null);
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
