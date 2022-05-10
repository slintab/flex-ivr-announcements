output "SYNC_DOCUMENT_NAME" {
  value       = module.sync.document_name
  description = "Name of the Sync Document to contain the announcement."
}

output "SYNC_TOKEN_FUNCTION_URL" {
  value       = module.functions.token_function_url
  description = "URL of the token function."
}

output "STUDIO_FLOW" {
  value       = module.studio.studio_flow
  description = "Name of the Studio flow."
}
