from rest_framework import permissions

class IsAdminOrOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj) -> bool:
        return request.user.is_superuser or request.user == obj.owner