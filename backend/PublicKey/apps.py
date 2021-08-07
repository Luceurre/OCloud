from django.apps import AppConfig


class AuthkeyConfig(AppConfig):
    name = "PublicKey"

    max_public_key_per_user = 50
