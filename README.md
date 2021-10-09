![Quasar + Laravel = Love](https://baex.mpalade.ro/images/quasar_and_laravel_is_love.png)

# Example Frontend (example-frontend)

Example Quasar v2(Vue) SPA skeleton frontend to be used with a Laravel 8 project.

This project uses:

- ~~Quasar [QEnv extension](https://github.com/quasarframework/app-extension-qenv/tree/dev/app-extension) to customize API URI depending on your environment.~~ Removed in v2
- Vuex state to handle the user authentication
- For the local environment, it uses the webpack's proxy feature to proxy API calls(see [here](https://github.com/training-yoyosan/example-frontend/blob/master/quasar.conf.js#L77)).

## About releases

* The last Quasar v1 release can be downloaded [here](https://github.com/training-yoyosan/example-frontend/releases/tag/1.0.9).
* The upgrade guide for existing installations can be found [here](https://github.com/training-yoyosan/example-frontend#upgrade-guide-to-v2).

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
quasar dev
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
cp .env.sample .env
vim .env
## Adjust API_BASE_URL
```

### Build

```bash
quasar build

# Adjust your server configuration according to
# https://next.router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations

# For Apache(optional)
cp .htaccess dist/spa
```

Deploy on your server.

**Note**: If you use HTTPS, use the protocol in your `.env` file.

## Upgrade guide to v2

```bash
git pull
# remove packages related folders and files
rm -rf node_modules/ .quasar/ yarn.lock
# copy and update the .env file
cp .env.sample .env
# remove the old quasar env file
rm .quasar.env.json

yarn

quasar build
```

Find out more in the [official upgrade guide](https://quasar.dev/start/upgrade-guide).

## Resources

- https://quasar.dev/introduction-to-quasar
- Quasar Discord #laravel channel
- For support, contact me at [contact@mpalade.ro](mailto:contact@mpalade.ro).
