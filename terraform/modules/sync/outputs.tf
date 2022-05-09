output "service" {
  value       = twilio_sync_services_v1.service.sid
  description = "Sid of the Sync Service."
}

output "document_name" {
  value       = twilio_sync_services_documents_v1.doc.unique_name
  description = "Name of the Sync Document."
}

output "document" {
  value       = twilio_sync_services_documents_v1.doc.sid
  description = "Sid of Sync Document."
}