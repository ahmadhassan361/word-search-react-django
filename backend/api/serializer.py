from rest_framework import serializers
from .models import Category, Game
import json
import uuid
class CategorySerializerGET(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'image', 'description']

class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game
        fields = ['id', 'category', 'title', 'description', 'words_list', 'game_id', 'key', 'isDisable']

    def create(self, validated_data):
        words_list = validated_data.pop('words_list', [])
        game = Game.objects.create(**validated_data)
        game.words_list = words_list
        game.game_id = uuid.uuid4()
        game.key = uuid.uuid4()
        game.save()
        return game
    
    def to_representation(self, instance):

        representation = super().to_representation(instance)
        if instance.category:  # Only include category if it's available
            representation['category'] = CategorySerializerGET(instance.category).data
        return representation


class CategorySerializer(serializers.ModelSerializer):
    games = serializers.SerializerMethodField()
    total_games = serializers.CharField(read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'title', 'image', 'description', 'games','total_games']

    def get_games(self, obj):
        request = self.context.get('request')
        games = obj.game_set.all()[:6]
        return GameSerializer(games, many=True, context={'request': request}).data
class CategoryGetSerializer(serializers.ModelSerializer):
    games = serializers.SerializerMethodField()
    total_games = serializers.CharField(read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'title', 'image', 'description', 'games','total_games']

    def get_games(self, obj):
        request = self.context.get('request')
        games = obj.game_set.all()
        return GameSerializer(games, many=True, context={'request': request}).data

