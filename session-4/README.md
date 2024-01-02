# Session 4 - Writing Javascript modules

## package.json - how to manage this file

The `package.json` file enables you to add `npm` dependencies to your module. You can include packages that are not included in the scaffold out of the box. This file should be installed at `/modules`, `/components`, or `/screens` - inside your module directory.

Let's look at the `react-native-app-menu` `package.json` file from our public [modules catalog](https://github.com/crowdbotics/modules):
```json
{
  "name": "@modules/app-menu",
  "version": "1.0.0",
  "description": "Module that shows available routes in a menu with links",
  "private": true,
  "main": "index.js",
  "author": "Crowdbotics"
}
```

This module has a `name`, a `description` and no dependencies.

Another example is the `react-native-camera` module:
```json
{
    "name": "@modules/camera",
    "version": "1.0.1",
    "description": "Camera Module",
    "private": true,
    "main": "index.js",
    "author": "Crowdbotics",
    "license": "ISC",
    "dependencies": {
        "react-native-actionsheet": "^2.4.2"
    },
    "x-dependencies": {
        "react-native-image-crop-picker": "0.36.2",
        "react-native-permissions": "3.0.4"
    }
}
```

This is an example of a module with dependencies.

## Adding libraries to your Javascript module

You can add dependencies by running `yarn add` within your module definition directory:
```shell
cd modules/react-native-share
yarn add react-native-share
rm yarn.lock
```

This adds `react-native-share` to your `package.json` `dependencies` property.

## Adding libraries that contain native code (autolinking)

For any library that includes native code (Android, iOS, or both) you must move the dependency on the `package.json` to the `x-dependencies` property.
```json
{
    "name": "@modules/share",
    "version": "1.0.0",
    "description": "",
    "private": true,
    "main": "index.js",
    "x-dependencies": {
        "react-native-share": "^10.0.2"
    }
}
```

Any `x-dependencies` entry will be installed directly in the root `package.json` of your app.

This is required due to a current limitation within `react-native` when resolving sub-dependencies while also linking native code.

## How to export your React Native components

Your main component in a module must be exported from the `index.js` file with a default export.

It can be a plain export like so:
```js
export default YourModuleMainComponentHere;
```

A plain export gets converted to this object:
```js
{
  title: "YourModuleMainComponentHere",
  navigator: YourModuleMainComponentHere
}
```

Or an explicit object that gives you control over the title, the entry point, the redux slice, and hook:
```js
export default {
  title: "Your module title here",
  navigator: YourModuleMainComponentHereOrYourMainStackNavigator,
  slice: YourModuleReduxSliceHere,
  hook: YourAppInitCodeHere
}
```

## Running code on app load

Whenever you want to run some code when your app loads - i.e. to initialize a chat service - you can include an `hook` property on your module export object.

This is an alternative to the `componentDidMount` React API.

As an example on our `react-native-share` module you could do:
```js
export default {
  title: "share",
  navigator: ShareMessage,
  hook: console.log("share module loaded")
}
```

And when you run the app:
```
npx react-native start
```

You will find the console logging the following message upon app load (try re-opening the app too):
> share module loaded

## Data Fetching - Writing Redux code

The scaffold includes Redux and Redux Toolkit configured out of the box.

You can export `slice` objects on your module's default export.

A `slice` object is made of the properties `reducer` and `actions`.

Redux Tookit includes an helper api for creating slices called `createSlice` that simplifies the implementations of reducers and action creators.

Here's an example for keeping track of the number of presses made on our share message button:
```js
import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
  name: "share",
  initialState: {
    count: 0
  },
  reducers: {
    increment(state) {
      state.count++
    }
  }
})
```

And then you can get the state for this module with `useSelector`:
```js
  const { count } = useSelector(state => state.Share)
```

Notice how this piece of state is nested within the state tree on the `Share` property. All modules get their own key within the root state tree named after the module directory name capitalized.

## Screen modules vs component modules vs react-native modules.

A quick recap on all of the different kinds of modules that you can create.

### Screen modules

Those modules have `root` property set to `/screens` and they may not contain any dependencies, no redux code, and are autoloaded.

### Component modules

Those modules have `root` property set to `/components`, may contain dependencies, no redux code, and are not autoloaded.

### React Native modules

Those modules have `root` property set to `/modules`, may contain dependencies, redux code, and are autoloaded.
