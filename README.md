![Docker](https://github.com/DRadman/loghub-cms/actions/workflows/docker-publish.yml/badge.svg?branch=master)
[![GitHub Latest Release)](https://img.shields.io/github/v/release/DRadman/loghub-cms?logo=github)](https://github.com/DRadman/loghub-cms/releases)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](LICENSE)
[![codecov](https://codecov.io/gh/DRadman/loghub-cms/graph/badge.svg?token=SWF5VXNMAF)](https://codecov.io/gh/DRadman/loghub-cms)
![Github All Releases](https://img.shields.io/github/downloads/DRadman/loghub-cms/total.svg?style=flat&logo=github)
[![Documentation Coverage](https://dradman.github.io/loghub-cms/images/coverage-badge-documentation.svg)](https://DRadman.github.io/loghub-cms/)

[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

[![Issues](https://img.shields.io/github/issues-raw/DRadman/loghub-cms.svg?style=flat&logo=github)](https://github.com/Dradman/loghub-cms/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/DRadman/loghub-cms.svg?style=flat&logo=github)](https://github.com/Dradman/loghub-cms/pulls)
![GitHub contributors](https://img.shields.io/github/contributors/DRadman/loghub-cms.svg?style=flat&logo=github)
![GitHub last commit](https://img.shields.io/github/last-commit/DRadman/loghub-cms.svg?style=flat&logo=github)


# LogHub - Remote Centralized Logging Solution (CMS)
This project is a Angular CMS application that provides an UI for LogHub (remote centralized logging solution). It allows you to collect and manage logs from distributed applications in a centralized location, enhancing troubleshooting and monitoring capabilities.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3.

This project utilizes next features of angular:
- Angular 17
- SSR (Server Side Rendering)
- Standalone Components
- Router (For url routing)
- HTTP Client (For api calls)
- NGRX (For state management)
- PrimeNG (For UI Components)


## Technologies Used
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![Pretier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build Docker Image
You can deploy the application using Docker. First, build your own image:
```bash
docker build -t your-domain/your-image-name:your-version .
```

Here is the full example:
```bash
docker build -t dradman/loghub-cms:1 .
```
###
Then you can run your own image with command:
```bash
docker run -p 80:4000 your-full-image-name 
```

Here is the full example:
```bash
docker run -p 80:4000 dradman/loghub-cms:1 . 
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Deploying with Docker

You can deploy the application using Docker. First, pull the latest Docker image from the GitHub Container Registry:
```bash
docker pull ghcr.io/dradman/loghub-cms:latest
```

Then, run the Docker container:
```bash
docker run -p 80:4000 ghcr.io/dradman/loghub-cms:latest
```

***Important:*** Make sure that all environment variables are set correctly.

### Docker-Compose

You can also run application using docker compose. See an example [here](docs/examples/docker-compose.yaml)

## Environment Variables

***Important:*** Due to angular & general limitation since application is served to local browser you can't use standard .env to update environment varaibles.

If you wish to change any of the variables you ***will have to*** build your own version of application where will change [these files](src/environments/)


