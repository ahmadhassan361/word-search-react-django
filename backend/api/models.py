from django.db import models
import uuid

# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=240)
    image = models.ImageField(upload_to='cat-img/',blank=True,null=True)
    description = models.TextField(blank=True,null=True)

    def __str__(self) -> str:
        return self.title

class Game(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=240)
    description = models.TextField()
    words_list = models.TextField()
    game_id = models.CharField(max_length=240, default=uuid.uuid4())
    key = models.CharField(max_length=240, default=uuid.uuid4())
    isDisable = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.game_id:
            self.game_id = uuid.uuid4()
        if not self.key:
            self.key = uuid.uuid4()
        super().save(*args, **kwargs)
        
    def __str__(self) -> str:
        return self.title