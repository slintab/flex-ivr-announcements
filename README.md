# Twilio Flex - IVR Announcements
:wave: Welcome to this repository!

This repository contains the code for a Twilio Flex plugin for publishing IVR announcements into an IVR system.


## Table of contents
* [Repository structure](#structure)
* [Setup](#setup)
* [Design](#design)
* [Demo](#demo)
* [Maintainer](#maintainer)

## Structure

- **flex/**: Twilio Flex plugin
- **functions/**: Twilio functions
- **studio/**: Twilio Studio flow (IVR)
- **terraform/**: Terraform configuration for deployment

## Setup

The easiest way to deploy this application is by using the provided Terraform configuration.
1. ***Deploy the Studio flow, Functions and Sync using Terraform:***
   1. Navigate to the terraform directory: `cd terraform/environments/dev`
   2. Initialize the configuration: `terraform init`
   3. Create the execution plan: `terraform plan`.
   4. Apply the configuration, creating the resources: `terraform apply`. Terraform will prompt for the following variables: 
        - `TWILIO_ACCOUNT_SID` - Account SID to use for deployment
        - `TWILIO_API_KEY` - API key to use for deployment 
        - `TWILIO_API_SECRET` - API secret to use for deployment
        - `FLEX_WORKFLOW_SID` - SID of the TaskRouter Workflow to transfer IVR callers to.
        - `FLEX_CHANNEL_SID` - SID of the task channel to use when transferring callers from IVR (Studio) to Flex.

        You can also set these as environment variables - when doing so, remember to prefix the variables names with `TF_VAR_`. E.g. `TF_VAR_FLEX_WORKFLOW_SID`.

        Once Terraform deploys the configuration, it will output the following variables which will be used in the next step:
        - `SYNC_DOCUMENT_NAME`
        - `SYNC_TOKEN_FUNCTION_URL` 
        - `STUDIO_FLOW`
 
2. ***Deploy the Flex plugin:***
   1. Navigate to the plugin directory: `cd flex/ivr-announcements`
   2. Rename `.env.example` to `.env`, open it and set the environment variables to the output values of step 1.
   3. Deploy the flex plugin from `/flex/ivr-announcements` following the steps [here](https://www.twilio.com/docs/flex/developer/plugins/cli/deploy-and-release). Note that the plugin requires ***Flex UI 2***.
   4. When ready, associate your Twilio Phone number with the Studio flow created with Terraform to start accepting calls with your IVR!


## Design
### Building blocks

The solution contains for main building blocks:
- **Twilio Sync Document**: a Sync document, which is a JSON document, is used for storing the contents of the current announcement.
- **Twilio Flex plugin**: displays the announcement and enables agents to view and update the announcement from Flex
- **Studio flow**: the IVR system; plays the announcement from the Sync document to callers if any, before transferring callers to Flex
- **Functions**: functions tie the different components together. They contain the logic for reading and writing to the Sync document from Flex and Studio.

### Architecture
![Architecture Diagram](architecture.png?raw=true)

The central piece to this solution is the Sync document in the middle, which contains the current announcement. On one side, there are the agents in Flex updating the announcement via a flex plugin. On the other side, there is an IVR flow in Studio reading and playing the announcement from the Sync document.


## Demo
![Demo](demo.png?raw=true)

## Maintainer
Thanks for reading this far!
If you have any questions, do not hesitate to reach out at `hello@slintab.dev`
