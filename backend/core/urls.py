"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path,re_path,include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from api.views import *

urlpatterns = [
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    path('admin/', admin.site.urls),
    path('api/v1/categories/', CategoryGamesListView.as_view(), name='category-list'),
    path('api/v1/sitemap/', CategoryGetGamesListView.as_view(), name='sitemap-list'),
    path('api/v1/games/', GameCreateView.as_view(), name='game-create'),
    path('api/v1/games-by-category/<str:category_title>/', GameListView.as_view(), name='game-list'),
    path('api/v1/games/<str:key>/<str:game_id>/', GameUpdateView.as_view(), name='game-update'),
    path('api/v1/games-get/<str:game_id>/', GameRetrieveView.as_view(), name='game-retrieve')

]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
