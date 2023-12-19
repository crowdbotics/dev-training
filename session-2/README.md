# Session 2 - Modules Overview

## What is a module?

In it's most basic form modules are a set of files that get installed to an app to a specific location. You have control over which files a module is made of and where those files get inserted when installed. One module can install multiple files to multiple locations.

For Javascript and Python modules you can depend on 3rd party packages by including npm/pip dependencies.

Modules also contain metadata that describe the module and integrate with our Dashboard features.

## Why write a module?

Modules are self-contained and reusable. With modules you can reuse features, logic, integration with 3rd party services and more across apps and even within a single app.

Modules empower you to reuse code.

## What types of modules exist?

On our [public catalog](https://github.com/crowdbotics/modules) you can find the following types of [modules](https://github.com/crowdbotics/modules/tree/develop/modules):
- `react-native` - React Native (Javascript) module that can include npm dependencies.
- `django` - Django (Python) module that can include pip dependencies.
- `screen` - pure React Native component with no dependencies
- no prefix - modules made of multiple parts, i.e. BE and FE.

## Creating your first module.

Let's start by creating a module called "splash" with type `react-native`:
```
crowdbotics-modules create --name splash --type react-native
```

The `--type` argument value can be `all`, `react-native`, or `django`.


Reminder, run `crowdbotics-modules help` to see example command usage.

## meta.json - what is it used for and how do I fill it in?

Your newly create module contains a [meta.json](/modules/react-native-splash/meta.json) file:
```
{
  "title": "splash",
  "description": "",
  "root": "/modules/splash",
  "schema": {}
}
```

Let's go over each property and how it's used.

### title

This property sets the title of the module. When browsing through your catalog on the dashboard this is the name that you will see.

### description

This property sets the description of the module. When browsing through your catalog on the dashboard this is the description that you will see.

## What are good module candidates?

Some properties that can help inform your decision:
- Feature or pieces of source code that are stand-alone.
- Can be modularized - You can extract this source code without breaking the app.
- The target source code has "solidified" - It's being changed less frequently, the app depends on it and its mostly bug free.

## Refactoring existing source code to make it modular.

Session 3.
