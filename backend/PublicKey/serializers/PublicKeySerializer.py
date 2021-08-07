from rest_framework import serializers
from PublicKey.models.PublicKey import PublicKey


class PublicKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicKey
        fields = ["name", "algorithm", "expiration_date", "value", "owner", "id"]
        read_only_fields = ["owner", "algorithm"]
