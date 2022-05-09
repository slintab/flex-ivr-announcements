variable "service_name" {
  type        = string
  description = "Name of the function service."
}

variable "sync_service_sid" {
  type        = string
  description = "Sid of the Sync Service containing the announcement."
}

variable "api_secret" {
  type        = string
  sensitive   = true
  description = "Twilio API secret."
}

variable "api_key" {
  type        = string
  sensitive   = true
  description = "Twilio API key."
}

variable "document_name" {
  type        = string
  description = "Name of the document containing the announcement."
}