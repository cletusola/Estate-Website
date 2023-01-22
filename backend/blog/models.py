from django.db import models
from datetime import date 
from django.contrib.auth import get_user_model 
User = get_user_model()

import PIL

# blog model 
class Blog(models.Model):

    Blog_Status = (
        ('publish','publish'),
        ('draft','draft'),
    )

    title = models.CharField(max_length=300, verbose_name="Title", null=False, blank=False)
    excerpt = models.CharField(max_length=500, verbose_name="Excerpt", null=True, blank=True,
                                help_text="Brief discription about the blog")
    slug = models.SlugField(max_length=150, blank=False, null=False, unique=True)
    image = models.ImageField(upload_to=f"blogs/{date.today()}", verbose_name="Image")
    content = models.TextField()
    written_by = models.CharField(max_length=100, verbose_name="Written By", null=True, blank=True)
    status = models.CharField(max_length=20, choices=Blog_Status, default='publish',
                            null=True, blank=True, verbose_name="Status")
    date = models.DateField(auto_now_add=True, verbose_name="Date", null=True, blank=True)


    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.slug

    # Setting default image size 
    def save(self, *args, **kwargs):
        super().save()
        img = PIL.Image.open(self.image.path)
        if img.height > 1000 or img.width > 1000:
            new_imgSize = (1000,1000)
            img.thumbnail(new_imgSize)
            img.save(self.image.path) 

   

