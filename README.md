# Dev Training

## Getting started

Before the first session make sure to [setup your developer environment](https://docs.crowdbotics.com/setting-up-your-developer-environment) correctly.

## [Session 1 - Scaffold overview](/session-1)

Introduction to the [django-scaffold](https://github.com/crowdbotics/django-scaffold/) and [react-native-scaffold](https://github.com/crowdbotics/react-native-scaffold/) and exploration of the code.

Topics:
- What exactly is a RAD stack app?
- What libraries are included by default in your app?
- Folder structure for the FE and BE.
- Webpack and Metro config aliases.
- app.js autoloading mechanisms with glob imports.
- Python automatic module discovery.
- Guidelines/Code style guide.
- Generating a demo app.

## [Session 2 - Modules overview](/session-2)

Introduction to the modules system, first look into creating modules and their structure.

Topics:
- What is a module?
- Why write a module?
- What types of modules exist?
- Creating your first module.
- meta.json - what is it used for and how do I fill it in?
- What are good module candidates?
- Refactoring existing source code to make it modular.

## [Session 3 - Modules tools (CLI)](/session-3)

Deep dive on the modules tooling that is available as a command line interface. How to perform common operations such as installing/removing modules on an app.

Topics:
- Parsing/validating modules.
- Installing your first module.
- Removing a module.
- How to extract already existing source code from a project into a module.
- How to update an existing module with updated source code from a project.

## Session 4 - Writing Javascript modules

More advanced topics around authoring Javascript modules, managing npm dependencies, and exporting your components.

Topics:
- package.json, pyproject.toml, setup.py - how to manage those files.
- Adding libraries to your Javascript module.
- Adding libraries that contain native code (autolinking).
- How to export your React components.
- Running code on App Load.
- Data Fetching - Writing Redux code.
- Screen modules vs component modules vs react-native modules.
- Module Options (options.js).

## Session 5 - Writing Python modules

More advanced topics around authoring Python modules, managing pip dependencies, and handling migrations.

Topics:
- pyproject.toml, setup.py - how to manage those files.
- Adding dependencies to your Python module.
- How to structure your Python module.
- How to handle migrations.
- Module Options (options.py).
