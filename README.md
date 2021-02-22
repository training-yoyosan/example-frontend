![Quasar + Laravel = Love](https://baex.mpalade.ro/images/quasar_and_laravel_is_love.png)

# Example Frontend (example-frontend)

Example Quasar(Vue) SPA skeleton frontend to be used with a Laravel 8 project.

This project uses:

- Quasar [QEnv extension](https://github.com/quasarframework/app-extension-qenv/tree/dev/app-extension) to customize API URI depending on your environment.
- Vuex state to handle the user authentication
- For the local environment, it uses the webpack's proxy feature to proxy API calls(see [here](https://github.com/training-yoyosan/example-frontend/blob/master/quasar.conf.js#L72)).

## Demo

Check out the live demo at http://frex.mpalade.ro

Use `admin@example.local` and password `test1234` to login.

## How to use

Just clone this project into your desired new awesome project folder:

```bash
cd ~/Work
git clone git@github.com:training-yoyosan/example-frontend.git your-next-awesome-project
```

and follow the instructions below to set it up for local or production.

Then customize it to your heart's content.

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

## Resources

- https://quasar.dev/introduction-to-quasar
- https://github.com/quasarframework/app-extension-qenv/tree/dev/app-extension
- Quasar Discord #laravel channel
