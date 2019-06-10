# Baloo

Friendly slothbear who talks on Slack when required.  Currently used in the monitoring pipeline for Azure production applications, and for suspicious AD events.

## Authorization

Bearer token.  Just ask for it

## File structure
    .
    ├── routes                  # All endpoints, grouped by application
    ...                   
    ├── server.js               # Entry point, Express config
    ...
    └── README.md

## API Documentation

Swagger UI: https://baloo.azurewebsites.us/docs

## Running Locally

### Prerequisites

* [Node.js](https://nodejs.org) - JS runtime
* .env - See .env.example for all required secrets

### Installation
```
git clone https://github.com/CityofPittsburgh/baloo
cd baloo
npm install
node server.js
```

## Deployment

Both staging and production services are hosted in Azure.  Application is deployed directly from github, and can be triggered either (a) through the Azure GUI, (b) through the [CLI](https://docs.microsoft.com/en-us/cli/azure/webapp/deployment/source?view=azure-cli-latest#az-webapp-deployment-source-sync), or (c) through the [proxy service](https://github.com/CityofPittsburgh/azure-proxy).

For complete documentation on the azure environment, see [here](https://github.com/CityofPittsburgh/all-things-azure.git).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

