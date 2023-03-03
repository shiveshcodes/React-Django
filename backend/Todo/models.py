from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    owner = models.ForeignKey('auth.User', related_name='todos', on_delete=models.CASCADE)
    

    def __str__(self):
        return self.title