from django.db import models


class QRCode(models.Model):
    text = models.CharField(max_length=100)
