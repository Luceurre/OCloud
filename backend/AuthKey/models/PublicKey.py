from django.db import models

from AuthKey.validators.validate_public_key import validate_public_key
from core.models import User


class PublicKey(models.Model):
    class EncryptionAlgorithm(models.TextChoices):
        RSA = ("RSA", "RSA")

    name = models.CharField(max_length=255, null=False)
    algorithm = models.CharField(
        max_length=10, choices=EncryptionAlgorithm.choices, null=False
    )
    expiration_date = models.DateField(null=True, blank=True)

    value = models.TextField(
        verbose_name="public key", null=False, validators=[validate_public_key]
    )

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
