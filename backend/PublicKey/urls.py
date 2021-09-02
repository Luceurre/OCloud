from django.urls import path

# Register your urls here.
from PublicKey.views.PublicKeyController import ListCreatePublicKeyController, UpdateDestroyPublicKeyController

urlpatterns = [
    path('', ListCreatePublicKeyController.as_view()),
    path('<int:pk>/', UpdateDestroyPublicKeyController.as_view())
]

app_name = ""
