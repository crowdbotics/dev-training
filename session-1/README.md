# Session 1 - Scaffold Overview

## What exactly is a RAD stack app?

RAD stands for React Native, APIs and Django. The front-end uses React Native and can be built for multiple targets such as iOS, Android and Web.
The back-end uses Django for the bulk of business logic and data persistence. Both parts can call and integrate with 3rd party APIs.

New apps are generated from our own custom scaffolds (templates) instead of using the `npx react-native init` or `django startproject` commands from upstream. They include customization and extra libraries out-of-the-box.

The Crowdbotics scaffolds for Django and React Native can be found here:
- [Django Scaffold](https://github.com/crowdbotics/django-scaffold/)
- [React Native Scaffold](https://github.com/crowdbotics/react-native-scaffold/)

## What libraries are included by default in your app?

Highlight libraries for Django:
- [djangorestframework](https://pypi.org/project/djangorestframework/) - Toolkit for building APIs.
- [dj-rest-auth](https://pypi.org/project/dj-rest-auth/) - Library for building authentication APIs.
- [boto3](https://pypi.org/project/boto3/) - AWS S3 SDK for Python.
- [psycopg2](https://pypi.org/project/psycopg2/) - PostgreSQL database adapter.
- [django-import-export](https://pypi.org/project/django-import-export/) - Import and export data in various formats and integrate with the Django Admin.

Highlight libraries for React Native:
- [react-native-web](https://www.npmjs.com/package/react-native-web) - React Native components on the Web.
- [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv) - Import environment variables.
- [@react-navigation/native](https://www.npmjs.com/package/@react-navigation/native) - Routing and navigation.
- [redux](https://www.npmjs.com/package/redux) - State management.
- [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) - Best practices for writing Redux logic.
- [react-native-paper](https://www.npmjs.com/package/react-native-paper) - Material Design library.
- [typescript](https://www.npmjs.com/package/typescript) - Typescript support.

There's more libraries included, you can find the full list of dependencies in your [/package.json](/package.json) and [/backend/Pipfile](/demo/backend/Pipfile) files.

## Folder structure for the FE and BE.

Some interesting facts:
- Your React Native app can be found in the root of your project and the Django app can be found within the [/backend](/demo/backend) directory.
- CI/CD configurations can be found within [/.circleci](/demo/.circleci) and [/.github](/demo/.github).
- Docker configuration can be found at [/Dockerfile](/demo/Dockerfile).
- Web build artifacts are copied to [/backend/web_build](/demo/backend/web_build).

## Webpack and Metro config aliases

All the custom directories in the React Native scaffold have their own alias for easier importing and reference. Each alias maps to the directory of the same name.

Aliases:
- `@modules` - Modules main directory, where modules are installed to.
- `@screens` - Special modules without dependencies that are pure React Native.
- `@store` - State management, your Redux code lives here.
- `@options` - Module's options React hooks and functions.
- `@components` - Components to be reused across the app, think of your Button, Avatar, Modal components.
- `@helpers` - Various Javascript helpers. Read [React Native Styling Patterns](https://docs.crowdbotics.com/react-native-styling-patterns) to learn how to use some of them.

Both [/webpack.config.js](/demo/webpack.config.js) and [/metro.config.js](/demo/metro.config.js) configure the aliases above.

Worth noting that when you are building for the "Web" target the webpack config is used and when building for mobile targets the metro config is used instead.

## App.js autoloading mechanisms with glob imports

Anything inside `@modules`, `@screens` and `@store` will be automatically loaded. When adding modules to `@modules` you won't have to register them in the app or make any other code changes. For each screen found a new navigation route is automatically generated. Let's see how this works in more detail.

In your [/modules/index.js](/demo/modules/index.js) you'll see that from all modules we construct four different lists which also roughly corresponds to what your module can export:
- slices - Redux Toolkit `createSlice` object.
- reducers - The reducer for the slice above. Each slice has a reducer and actions.
- navigators - your module's entry point, it can be just a component or a react navigation navigator (Stack, Drawer, Tabs, etc).
- hooks - your custom hooks that run on app load

This how your module export typically looks like:
```javascript
export default {
  title: "Maps", // required
  navigator: Maps, // optional
  slice: MapsSlice // optional
};
```

Plain exports are also supported:
```javascript
export default MapsNavigator;
```

## Python automatic module discovery

The main app [/backend/settings.py](/demo/backend/demo/settings.py) adds `MODULES_APPS` to the `INSTALLED_APPS` list. `MODULES_APPS` is generated from `get_modules` defined at [/backend/modules/manifest.py](/demo/backend/modules/manifest.py).

`get_modules` finds all directories within the [/backend/modules](/demo/backend/modules) directory that are Django apps (contains `apps.py`) and builds a list of all the results.

Which means that any Django app within [/backend/modules](/demo/backend/modules) automatically gets added to `INSTALLED_APPS`.

The same happens for any `urls.py` and `admin.py` found within [/backend/modules](/demo/backend/modules) - the `urlpatterns` and admin settings are all registered too.

## Guidelines/Code style guide

We maintain a set of guidelines on our documentation website - [Guidelines for writing good modules](https://docs.crowdbotics.com/authoring-modules#8485550627404b119743b983b32c14ed).

## Generating a demo app

You can create a [demo app](/demo) that uses our scaffolds in any git repository by running:
```shell
npx crowdbotics/modules demo
```

You can also install the tool locally (faster version, doesn't check for updates upstream):
```shell
npm install -g crowdbotics/modules
crowdbotics-modules
```
