terraform {
  required_providers {
    twilio = {
      source  = "RJPearson94/twilio"
      version = "0.17.0"
    }
  }
}


resource "twilio_serverless_service" "service" {
  unique_name   = var.service_name
  friendly_name = var.service_name
}

resource "twilio_serverless_environment" "environment" {
  service_sid = twilio_serverless_service.service.sid
  unique_name = var.service_name
}

resource "twilio_serverless_variable" "api_secret" {
  service_sid     = twilio_serverless_service.service.sid
  environment_sid = twilio_serverless_environment.environment.sid
  key             = "API_SECRET"
  value           = var.api_secret
}

resource "twilio_serverless_variable" "api_key" {
  service_sid     = twilio_serverless_service.service.sid
  environment_sid = twilio_serverless_environment.environment.sid
  key             = "API_KEY"
  value           = var.api_key
}

resource "twilio_serverless_variable" "document_name" {
  service_sid     = twilio_serverless_service.service.sid
  environment_sid = twilio_serverless_environment.environment.sid
  key             = "DOCUMENT_NAME"
  value           = var.document_name
}

resource "twilio_serverless_variable" "sync_service_sid" {
  service_sid     = twilio_serverless_service.service.sid
  environment_sid = twilio_serverless_environment.environment.sid
  key             = "SYNC_SERVICE_SID"
  value           = var.sync_service_sid
}

resource "twilio_serverless_function" "token" {
  service_sid   = twilio_serverless_service.service.sid
  friendly_name = "token"
  source           = "../../../functions/token.js"
  content_type      = "application/javascript"
  path              = "/token"
  visibility        = "public"
}

resource "twilio_serverless_function" "announcement" {
  service_sid   = twilio_serverless_service.service.sid
  friendly_name = "announcement"
  source           = "../../../functions/announcement.js"
  content_type      = "application/javascript"
  path              = "/announcement"
  visibility        = "protected"
}

resource "twilio_serverless_build" "build" {
  service_sid = twilio_serverless_service.service.sid
  function_version {
    sid = twilio_serverless_function.announcement.latest_version_sid
  }
  function_version {
    sid = twilio_serverless_function.token.latest_version_sid
  }

  dependencies = {
    "twilio"                      = "3.29.2"
    "lodash"                      = "4.17.11"
    "util"                        = "0.11.0"
    "xmldom"                      = "0.1.27"
    "@twilio/runtime-handler"     = "1.2.1"
    "twilio-flex-token-validator" = "1.5.6"
    "axios"                       = "0.27.2"
  }

  polling {
    enabled = true
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "twilio_serverless_deployment" "deployment" {
  service_sid     = twilio_serverless_service.service.sid
  environment_sid = twilio_serverless_environment.environment.sid
  build_sid       = twilio_serverless_build.build.sid

  lifecycle {
    create_before_destroy = true
  }
}








