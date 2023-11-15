from django.contrib import admin
from .models import *
admin.site.site_header = "Word Search Cafe Admin"
admin.site.site_title = "Word Search Cafe Admin"
admin.site.index_title = "Word Search Cafe Admin"
# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'description')  # Customize the attributes you want to display

admin.site.register(Category, CategoryAdmin)
class GameAdmin(admin.ModelAdmin):
    list_display = ('id','category', 'title', 'description','words_list', 'game_id', 'key', 'isDisable')  

admin.site.register(Game, GameAdmin)