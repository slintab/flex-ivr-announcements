terraform {
  required_providers {
    twilio = {
      source  = "twilio/twilio"
      version = ">=0.4.0"
    }
  }
}

resource "twilio_studio_flows_v2" "flow" {
  friendly_name  = "Flex IVR Announcement Flow"
  commit_message = "Initial commit"
  status         = "published"
  definition = templatefile("../../../studio/flex-ivr-announcement-flow.tftpl", local.params)
}

locals{
  params = {
    "ANNOUNCEMENT_FUNCTION_SERVICE_SID" = var.announcement_function_service_sid
    "ANNOUNCEMENT_FUNCTION_ENVIRONMENT_SID" = var.announcement_function_environment_sid
    "ANNOUNCEMENT_FUNCTION_SID" = var.announcement_function_sid
    "ANNOUNCEMENT_FUNCTION_URL" = var.announcement_function_url
    "FLEX_WORKFLOW_SID" = var.flex_workflow_sid
    "FLEX_CHANNEL_SID" = var.flex_channel_sid
  }
}