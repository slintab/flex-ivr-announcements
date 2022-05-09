variable "announcement_function_service_sid" {
  type        = string
  description = "Service sid of the announcement function."
}

variable "announcement_function_environment_sid" {
  type        = string
  description = "Environment sid of the announcement function."
}

variable "announcement_function_sid" {
  type        = string
  description = "Sid of the announcement function."
}

variable "announcement_function_url" {
  type        = string
  description = "URL of the announcement function."
}

variable "flex_workflow_sid" {
  type        = string
  description = "Sid of the Flex workflow to forward calls to."
}

variable "flex_channel_sid" {
  type        = string
  description = "Sid of the Flex channel to forward calls to."
}