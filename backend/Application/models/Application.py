import uuid
from django.db import models

from Application.models.ApplicationPool import ApplicationPool


class Application(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=255, default="")
    version = models.CharField(max_length=255, default="")

    application_pool = models.ForeignKey(ApplicationPool, on_delete=models.CASCADE)

    cpu_capacity = models.FloatField(null=False, default=1., verbose_name="CPU capacity of the application.")
    memory_capacity = models.IntegerField(null=False, default=256, verbose_name="Memory capacity of the application.")

    application_file = models.FileField()

