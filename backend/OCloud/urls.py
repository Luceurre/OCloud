"""OCloud URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from OCloud.views import health

admin.site.site_title = "O Cloud Site Admin"
admin.site.site_header = "O Cloud Administration"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("core.auth_urls")),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("health", health, name="health"),
    path('public_keys', include('PublicKey.urls'))
]

# if settings.DEBUG:
#     from django.conf.urls.static import static
#     import debug_toolbar
#
#     urlpatterns = (
#         [path("__debug__/", include(debug_toolbar.urls))]
#         + static(settings.MEDIA_URL_PATH, document_root=settings.MEDIA_ROOT)
#         + urlpatterns
#     )
