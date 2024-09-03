from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('search/', views.search_view, name='search'),
    path('sort/', views.sort_view, name='sort'),
    path('shortest-path/', views.shortest_path_view, name='shortest-path'),
]