from django.apps import AppConfig


class AuthkeyConfig(AppConfig):
    name = "AuthKey"

    max_public_key_per_user = 50
