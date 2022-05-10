output "studio_flow" {
  value = twilio_studio_flows_v2.flow.friendly_name
  description = "Name of the Studio flow."
}