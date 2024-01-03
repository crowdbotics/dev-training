# pyproject.toml, setup.py - how to manage those files

When creating a new django module, i.e. a "QR" module that converts text to a QR code image:
```shell
npx crowdbotics/modules create --name qr --type django
```

The files `pyproject.toml` and `setup.py` will be created for you. We like to use `setuptools` as the "build backend".


```python
# setup.py
from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_django_qr",
    version="0.1",
    packages=["qr"],
    install_requires=[],
    cmdclass={"build": BuildCommand},
)
```

This module starts with no dependencies, the `install_requires` is empty.

# Adding dependencies to your Python module

Let's say that we want to use [qrcode](https://pypi.org/project/qrcode/) to build this module.

Edit the [setup.py](/modules/django-qr/django_qr/setup.py) file and add `qrcode` to `install_requires`:

```python
setup(
    name="cb_django_qr",
    version="0.1",
    packages=["qr"],
    install_requires=["qrcode"],
    cmdclass={"build": BuildCommand},
)
```

Test our work by installing the module in the demo app and confirming that the library was installed:
```shell
crowdbotics-modules add django-qr
cd demo/backend
pipenv install
pipenv graph | grep qrcode -B 1 -A 2
```

And you should see the following output:
```shell
Loading .env environment variables...
cb-django-qr==0.1
└── qrcode [required: Any, installed: 7.4.2]
    ├── pypng [required: Any, installed: 0.20220715.0]
    └── typing-extensions [required: Any, installed: 4.9.0]
```

# How to structure your Python module

Your module's main directory [qr](/modules/django-qr/django_qr/qr) is a [Django app generated with the startapp command](https://docs.djangoproject.com/en/3.2/ref/django-admin/#startapp).

Here you can for example create an `urls.py` file if you want to expose endpoints, or `viewsets.py` to leverage Django Rest Framework.

Lets say that we want to expose a `/qrcode` endpoint for our module that takes text and returns a base64 image.

Start by creating an `viewsets.py` file like so:
```python
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
import io
import qrcode
import base64


class TextLikeSerializer(serializers.Serializer):
    text = serializers.CharField()


class QRLikeSerializer(serializers.Serializer):
    qrcode = serializers.CharField()


class QRCodeView(APIView):
    @extend_schema(request=TextLikeSerializer, responses=QRLikeSerializer)
    def post(self, request, *args, **kwargs):
        """
        This function takes text as input and returns Qrcode Image converted into base64 string.
        """
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=4,
            border=4,
        )

        qr.add_data(request.data["text"])
        qr.make(fit=True)
        img = qr.make_image()

        buffered = io.BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return Response({"qrcode": img_str}, status=status.HTTP_200_OK)
```


And then an `urls.py` file that registers the endpoint in the router:
```python
from django.urls import path, include
from rest_framework import routers

from .viewsets import QRCodeView

router = routers.DefaultRouter()
urlpatterns = [
    path("", include(router.urls)),
    path("qrcode/", QRCodeView.as_view()),
]
```

Install the module again and test the changes:
```python
crowdbotics-modules add django-qr
python manage.py runserver # restart
```

# How to handle migrations

Let's say that you want to create a new data model in your module, you can do so by editing `models.py`:
```python
# qr/models.py
from django.db import models


class QRCode(models.Model):
    text = models.CharField(max_length=100)
```

Then install your module:
```shell
crowdbotics-modules add django-qr
```

And generate the migrations:
```shell
cd backend
pipenv shell
python manage.py makemigrations
```

Save the newly generated migration files on your module:
```shell
crowdbotics-modules commit django-qr
```

You now have the migration files for your module that live inside your module's django app.
