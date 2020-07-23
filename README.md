# Example Frontend (example-frontend)

Example SPA frontend to be used with a Laravel 7+ project.

## Local setup

### Install the dependencies

```bash
yarn
```

### Start the app in development mode

**Note**: This setup is using a [proxy configuration](https://github.com/training-yoyosan/example-frontend/blob/master/quasar.conf.js#L72) for the `devServer` definition in `quasar.conf.js`. Only needed for local development.

```bash
quasar dev
```

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
```

Deploy on your server.
