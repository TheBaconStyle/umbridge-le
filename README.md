# Umbridge-LE

Umbridge-LE - Digital learning environment for universal international resource and achievement base for global education

# Getting started

To run Umbridge-LE on your machine you need nodejs version >= 18 and yarn version >= 4.
Check your node version:

```
node -v
```

And Yarn version:

```
yarn -v
```

Then clone this repo and install project dependencies:

```
yarn
# or #
yarn install
```

Next we should configure the project. The project basic config is in `.env` file. Change it if want to customize data storage path.

Next we should set up project database.
We can do this with the next commands:

```
yarn workspace backend migration:generate src/migrations/initial

yarn workspace backend build

yarn workspace backend migrations:run
```

Thats all for project startup Now run the project by:

```
yarn build && yarn start
```
