from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Category, Game
from .serializer import CategorySerializer, GameSerializer,CategoryGetSerializer
from django.db.models import Count
from django.shortcuts import get_object_or_404

class CategoryGamesListView(generics.ListAPIView):
    queryset = Category.objects.prefetch_related('game_set').annotate(
        total_games=Count('game')
    ).order_by('id')
    serializer_class = CategorySerializer

    def get_serializer_context(self):
        # Pass request context to serializer to get the desired number of games
        return {'request': self.request}
class CategoryGetGamesListView(generics.ListAPIView):
    queryset = Category.objects.prefetch_related('game_set').annotate(
        total_games=Count('game')
    ).order_by('id')
    serializer_class = CategoryGetSerializer

    def get_serializer_context(self):
        # Pass request context to serializer to get the desired number of games
        return {'request': self.request}
class GameCreateView(generics.CreateAPIView):
    serializer_class = GameSerializer

class GameListView(generics.ListAPIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        category_title = self.kwargs['category_title']
        return Game.objects.filter(category__title=category_title)

class GameUpdateView(generics.UpdateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field = ('key', 'game_id')
    def get_object(self):
        key = self.kwargs.get('key')
        game_id = self.kwargs.get('game_id')
        return get_object_or_404(Game, key=key, game_id=game_id)

class GameRetrieveView(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field = 'game_id'