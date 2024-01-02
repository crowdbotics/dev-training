# Session 3 - Modules tools (CLI)

## Setting up your demo app

Before starting:
https://docs.crowdbotics.com/setting-up-your-developer-environment

Before we start on today's session topics lets quickly setup the demo app so that you can run both backend and frontend apps locally.

Start by creating an `.env` file and a secret key:
```shell
cd demo/backend
cp .env.example .env
python -c 'from secrets import token_urlsafe; print("SECRET_KEY=" + token_urlsafe(50))'
```

And then edit your `/demo/backend/.env` file to use a temporary database and the secret key:
- `DATABASE_URL=sqlite:////tmp/my-tmp-sqlite.db`
- `SECRET_KEY=<output from python command>`

```shell
pipenv --python 3.8
pipenv install --dev
pipenv shell
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Login to the [admin panel](http://localhost:8000/admin/) and then visit the [api-docs](http://localhost:8000/api-docs/) page.

## Parsing/validating modules.

Modules need to be valid before they can be made available on our Dashboard.

You can valid your modules by running the following command:
```shell
crowdbotics-modules parse --source modules
```

The following checks are performed:
- module contains a `preview.png` file.
- module contains a `meta.json` file with a `root` property.
- `screen` modules `root` must start with `/screens`.
- `screen` modules must have no dependencies.
- `screen` modules `package.json`'s `name` must start with `@screens/`.
- `screen` modules must contain a default export in the `index.js` file.

## Installing your first module.

Install your first module with the following command:
```shell
crowdbotics-modules add react-native-splash
```

Notice that a new directory was created at [/demo/modules](/demo/modules) named `splash`.

Also worth noting that your [/demo/package.json](/demo/package.json) now contains a new dependency `@modules/splash`.

## Removing a module.

Remove your recently installed module with the following command:
```shell
crowdbotics-modules remove react-native-splash
```

Your [/demo/package.json](/demo/package.json) is updated - the `@modules/splash` dependency is removed - and your [/demo/modules/splash](/demo/modules/splash) directory is removed.

## How to extract already existing source code from a project into a module.

On the parent directory of this project run:
```shell
git clone https://github.com/crowdbotics/modules.git crowdbotics@modules
```

And then in the root of this project run:
```shell
crowdbotics-modules add screen-appointment-listing --source ../crowdbotics@modules/modules
```

Identify your potential modules and refactor:
- AppointmentListScreen can become your standard listing component with some prop massaging
- Appointment can be a stand-alone component (children can be extracted later too)
- `setAppointments` data can be moved away

Create one module for each component/screen that can be abstracted.

## How to update an existing module with updated source code from a project.

After creating your new modules and refactoring your code into multiple modules run:
```
crowdbotics-modules commit <your-module-name>
```

to update your module definition.
