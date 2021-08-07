from rest_framework import generics, permissions, response, status

from AuthKey.models.PublicKey import PublicKey
from AuthKey.serializers.PublicKeySerializer import PublicKeySerializer
from AuthKey.services.PublicKeyService import can_user_create_new_public_key


class PublicKeyController(generics.ListCreateAPIView):
    serializer_class = PublicKeySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PublicKey.objects.filter(owner=self.request.user)

    def post(self, request, *args, **kwargs):
        if not can_user_create_new_public_key(request.user):
            return response.Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        return super().post(request, *args, **kwargs)
