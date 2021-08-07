from Crypto.PublicKey import RSA
from django.core.exceptions import ValidationError


def validate_public_key(public_key: str) -> None:
    try:
        RSA.import_key(public_key)
    except ValueError:
        raise ValidationError("Unsupported public key format")
