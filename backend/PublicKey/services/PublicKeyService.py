from PublicKey.models.PublicKey import PublicKey
from django.apps import apps


def can_user_create_new_public_key(user) -> bool:
    return user.is_superuser or PublicKey.objects.filter(owner=user).count(
        apps.get_app_config("AuthKey")
    )
