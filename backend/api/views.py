from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Category, Game
from .serializer import CategorySerializer, GameSerializer
from django.db.models import Count

class CategoryGamesListView(generics.ListAPIView):
    queryset = Category.objects.prefetch_related('game_set').annotate(
        total_games=Count('game')
    ).order_by('id')
    serializer_class = CategorySerializer

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

class GameRetrieveView(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field = 'game_id'