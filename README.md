# Front end Automation for Eneco sales flow

This repository contains an automated end-to-end test for the Eneco Sales Flow application, implemented using Playwright. The test covers critical user journeys such as accepting cookies, entering customer data, choosing energy preferences, and finalizing the order.

## Prerequisites
Before running the tests,please ensure that you have the following tools installed:
Node.js (v16 or later): Node.js download
Playwright: The framework for browser automation used in this project.

## Setup

1. Clone the repository
2. Install Dependencies
3. Configure Environment
Ensure that the test suite is using the correct environment configuration. You can configure this in playwright.config.ts to set up the browser settings, base URL, and other preferences for running tests.
4. Create a Config File for Form Inputs (input.ts)
The data in this file will be used during the form filling process in the test.

## Test Flow
The test flow for the automated test follows these steps:
1. Navigate to URL : Open eneco web page
2. Accept Cookies: The test starts by accepting cookies on the main page of the Eneco website.
3. Enter Address: Fill in address information and proceed to the next step.
4. Choose Energy Type: The user selects their energy type (electricity) and proceeds.
5. Enter Energy Consumption: The user is asked about their energy usage (normal and off-peak usage).
6. Solar Panel Question: The user specifies whether they have solar panels.
7. Moving Question: The user answers whether they are moving.
8. Contract Type: The user selects the contract type (Dynamisch).
9. Customer Data: The user provides personal information such as name, date of birth, and contact information.
10. Email and Phone: The user enters their email and phone number.
11. Final Confirmation: The user is presented with a confirmation of their order.

## Execute the test
To run the entire test suite, execute the following command in the root directory of the project:
npx playwright test

## Test Reports
A JSON report in the test-results directory.