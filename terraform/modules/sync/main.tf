terraform {
  required_providers {
    twilio = {
      source  = "twilio/twilio"
      version = ">=0.4.0"
    }
  }
}

resource "twilio_sync_services_v1" "service" {
  friendly_name                   = var.service_name
}

resource "twilio_sync_services_documents_v1" "doc" {
  service_sid = twilio_sync_services_v1.service.sid
  data = jsonencode({
    announcement : "",
  })
  unique_name = var.document_name
}