# SendGrid Contact Manager

## About

This repository contains a sample application demonstrating the integration and usage of the SendGrid API for email services. It includes functions to add, remove, and retrieve contacts from SendGrid's marketing lists.

## Features

- Integration with SendGrid API
- Contact management in marketing lists
  - Adding a contact with specified details to the SendGrid marketing list
  - Fetching the contact with the specified email address
  - Deleting the contact from the marketing list

## Getting Started

- Clone the repo and install dependencies using `npm install`
- Set up your SendGrid API key and marketing list ID in the `.env` file
- Uncomment the method call you wish to test inside the `main` function in `index.ts`
- Use `npx ts-node src/index.ts` command to execute the index file

## License

This project is licensed under the MIT License - see the `LICENSE.txt` file for details.
