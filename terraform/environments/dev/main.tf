provider "twilio" {
  account_sid = var.TWILIO_ACCOUNT_SID
  username     = var.TWILIO_API_KEY
  password  = var.TWILIO_API_SECRET
}

provider "twiliorjpearson94" {
  account_sid = var.TWILIO_ACCOUNT_SID
  api_key     = var.TWILIO_API_KEY
  api_secret  = var.TWILIO_API_SECRET
}

terraform {
  required_providers {
    twilio = {
      source  = "twilio/twilio"
      version = ">=0.4.0"
    }
    twiliorjpearson94 = {
      source  = "RJPearson94/twilio"
      version = "0.17.0"
    }

  }

  required_version = ">= 1.1.0"

  backend "local" {}
}


module "sync" {
  source           = "../../modules/sync"
  service_name = var.SYNC_SERVICE_NAME
  document_name = var.DOCUMENT_NAME
}

module "functions" {
  source           = "../../modules/functions"
  service_name = var.SYNC_SERVICE_NAME
  sync_service_sid = module.sync.service
  api_key = var.TWILIO_API_KEY
  api_secret = var.TWILIO_API_SECRET
  document_name = var.DOCUMENT_NAME
}

module "studio" {
  source           = "../../modules/studio"
  announcement_function_service_sid = module.functions.function_service_sid
  announcement_function_environment_sid = module.functions.function_environment_sid
  announcement_function_sid = module.functions.announcement_function_sid
  announcement_function_url = module.functions.announcement_function_url
  flex_workflow_sid = var.FLEX_WORKFLOW_SID
  flex_channel_sid = var.FLEX_CHANNEL_SID
}