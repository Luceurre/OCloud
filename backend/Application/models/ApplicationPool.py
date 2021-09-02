import uuid
import docker
from typing import Optional, Iterable

from django.db import models

from core.models import User


class ApplicationPool(models.Model):
    class PoolType(models.TextChoices):
        STANDALONE = "SA", "STANDALONE"
        COMMON = "CM", "COMMON"
        GROUP = "GR", "GROUP"

    class StorageType(models.TextChoices):
        PERSISTENT = "P", "PERSISTENT"
        EPHEMERAL = "E", "EPHEMERAL"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, default="")
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    pool_type = models.CharField(max_length=2, choices=PoolType.choices, null=False, default=PoolType.STANDALONE)
    storage_type = models.CharField(max_length=1, choices=StorageType.choices, null=False, default=StorageType.EPHEMERAL)

    storage_capacity = models.IntegerField(default=256, verbose_name="Storage capacity in Mo of the pool, only if storage type is persistent.")


    def save(
            self,
            force_insert: bool = ...,
            force_update: bool = ...,
            using: Optional[str] = ...,
            update_fields: Optional[Iterable[str]] = ...,
    ) -> None:
        if self._state.adding is True:
            docker_client = docker.from_env()
            pool_volume = docker_client.volumes.create(self.id)
            pool_volume.attrs


        return super().save(force_insert, force_update, using, update_fields)
