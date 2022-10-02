# javascript-calendar-appointment

This is a dashboard for dental equipment technician(s) to manage their appointments for the customers (dentists).

This project is built on Vue.js, with backend services running on AWS:

- Cognito for user authentication & authorization
- DynamoDB for data storage
- Lambda functions to access database
- API Gateway to access lambda functions

# Quick Start

This project is [hosted on Vercel](https://javascript-calendar-appointment.vercel.app/) for easy access without installation.

Please contact me to obtain application credentials.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

1. Install project dependencies

    ```sh
    npm install
    ```

2. Create `.env` file based on `.env.example`

    ```sh
    cp .env.example .env
    ```
3. Update `.env` file with corresponding values

    a. `VITE_CLIENT_ID`: Client ID for AWS Cognito

    b. `VITE_USER_POOL_ID`: Client ID for AWS Cognito

    c. `VITE_API_GATEWAY`: API URL


### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
