import { Notifications, NotificationType } from "@twilio/flex-ui";
import Announcement from "../components/Announcement";

Notifications.registerNotification({
  id: "ivrAnnouncement",
  closeButton: true,
  timeout: 0,
  content: <Announcement />,
  type: NotificationType.information,
});
