from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

from datetime import date 
import PIL 

# agent profile model
class AgentProfile(models.Model):
    picture = models.ImageField(upload_to=f'profile/{date.today()}', default='avatar.jpg',blank=True,null=True)
    first_name = models.CharField(max_length=40, verbose_name="Firstname", null=False, blank=False)
    last_name = models.CharField(max_length=40, verbose_name="Lastname", null=False, blank=False)
    username = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    email = models.EmailField(max_length=150, verbose_name="Email", null=False, blank=False)
    phone = models.CharField(max_length=30, verbose_name="Phone", null=True, blank=True)
    mobile = models.CharField(max_length=30, verbose_name="Mobile", null=True, blank=True)
    address = models.CharField(max_length=200, verbose_name="Address", null=True, blank=True)
    bio = models.TextField(null=True, blank=True, verbose_name="Bio")
    twitter = models.URLField(max_length=100, verbose_name="Twitter", null=True, blank=True,
                            help_text="url fields must start with 'http://' or 'https://' ")
    facebook = models.URLField(max_length=100, verbose_name="Facebook", null=True, blank=True,
                            help_text="url fields must start with 'http://' or 'https://' ")
    instagram = models.URLField(max_length=100, verbose_name="Instagram", null=True, blank=True,
                            help_text="url fields must start with 'http://' or 'https://' ")
    skype = models.URLField(max_length=100, verbose_name="Skype", null=True, blank=True,
                            help_text="url fields must start with 'http://' or 'https://' ")
    date = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    is_staff = models.BooleanField(default=False, null=True,blank=True)

    def __str__(self):
        return self.first_name 

    # setting profile picture resolution 
    def save(self, *args, **kwargs):
        super().save()
        img = PIL.Image.open(self.picture.path)
        if img.height > 800 or img.width > 800:
            new_img = (800,800)
            img.thumbnail(new_img)
            img.save(self.picture.path)




