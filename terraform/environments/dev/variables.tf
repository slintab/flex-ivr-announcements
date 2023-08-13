variable "SYNC_SERVICE_NAME" {
  type        = string
  description = "Name of Sync Service to contain the announcement."
  default = "flex-ivr-announcements"
}

variable "DOCUMENT_NAME" {
  type        = string
  description = "Name of the Sync Document to contain the announcement."
  default = "flex-ivr-announcement"
}

variable "TWILIO_ACCOUNT_SID" {
  type        = string
  sensitive   = true
  description = "Twilio Account SID."
}

variable "TWILIO_API_KEY" {
  type        = string
  sensitive   = true
  description = "Twilio API key."
}

variable "TWILIO_API_SECRET" {
  type        = string
  sensitive   = true
  description = "Twilio API secret."
}


variable "FLEX_WORKFLOW_SID" {
  type        = string
  description = "Sid of the Flex workflow to forward calls to."
}


variable "FLEX_CHANNEL_SID" {
  type        = string
  description = "Sid of the Flex channel to forward calls to."
}