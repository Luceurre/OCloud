from rest_framework import serializers
from AuthKey.models.PublicKey import PublicKey


class PublicKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicKey
        fields = ["name", "algorithm", "expiration_date", "value", "owner"]
        read_only_fields = ["owner", "algorithm"]
