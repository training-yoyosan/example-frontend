![Quasar + Laravel = Love](https://prnt.sc/vhb78n)

# Example Frontend (example-frontend)

Example SPA frontend to be used with a Laravel 8 project.

## Demo

Check out the live demo at http://frex.mpalade.ro

Use `admin@example.local` and password `test1234` to login.

## Local setup

### Install the dependencies

```bash
yarn
```

### Start the app in development mode

```bash
yarn run dev
```

**Notes**

- This setup is using a [proxy configuration](https://github.com/training-yoyosan/example-frontend/blob/master/quasar.conf.js#L76) for the `devServer` definition in `quasar.conf.js`. Only needed for local development.
- Use `admin@example.local` with password `test1234` to login.

### Almost there

Next set up the Laravel project(acting as an API) from [here](https://github.com/training-yoyosan/example-backend).

Now access the application at http://localhost:8080.

## Deployment in production

### Setup

```bash
# install dependencies
yarn

# setup env
vim .quasar.env.json
## Adjust API_BASE_URL
```

### Build

```bash
yarn run build
# or
QENV=production quasar build

# Adjust your server configuration according to
# https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations

# For Apache(optional)
cp .htaccess dist/spa
```

Deploy on your server.

**Note**: If you use HTTPS, use the protocol in your `.quasar.env.json` file.
