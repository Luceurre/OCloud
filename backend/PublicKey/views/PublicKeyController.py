from rest_framework import generics, permissions, response, status

from PublicKey.models.PublicKey import PublicKey
from PublicKey.permissions.IsAdminOrOwner import IsAdminOrOwner
from PublicKey.serializers.PublicKeySerializer import PublicKeySerializer
from PublicKey.services.PublicKeyService import can_user_create_new_public_key


class ListCreatePublicKeyController(generics.ListCreateAPIView):
    serializer_class = PublicKeySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PublicKey.objects.filter(owner=self.request.user)

    def post(self, request, *args, **kwargs):
        if not can_user_create_new_public_key(request.user):
            return response.Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        return super().post(request, *args, **kwargs)


class UpdateDestroyPublicKeyController(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PublicKeySerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrOwner]
    queryset = PublicKey.objects.all()
