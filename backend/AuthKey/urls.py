from django.urls import path

# Register your urls here.
from AuthKey.views.PublicKeyController import PublicKeyController

urlpatterns = [
    path('', PublicKeyController.as_view())
]

app_name = ""
