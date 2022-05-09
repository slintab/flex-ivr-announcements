output "token_function_url" {
  value       = "https://${twilio_serverless_environment.environment.domain_name}${twilio_serverless_function.token.path}"
  description = "URL of the token function."
}

output "announcement_function_url" {
  value       = "https://${twilio_serverless_environment.environment.domain_name}${twilio_serverless_function.announcement.path}"
  description = "URL of the announcement function."
}

output "announcement_function_sid" {
  value       = twilio_serverless_function.announcement.sid
  description = "Sid of the announcement function."
}

output "function_service_sid" {
  value       = twilio_serverless_service.service.sid
  description = "Sid of the function service."
}

output "function_environment_sid" {
  value       = twilio_serverless_environment.environment.sid
  description = "Sid of the function environment."
}