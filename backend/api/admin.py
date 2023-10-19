from django.contrib import admin
from .models import *
# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'description')  # Customize the attributes you want to display

admin.site.register(Category, CategoryAdmin)
class GameAdmin(admin.ModelAdmin):
    list_display = ('id','category', 'title', 'description', 'game_id', 'key', 'isDisable')  

admin.site.register(Game, GameAdmin)