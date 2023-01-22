from django.db.models.signals import post_save 
from django.dispatch import receiver 
from django.contrib.auth import get_user_model 
User = get_user_model()

from .models import AgentProfile 

# signal to create profile on registration 
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        AgentProfile.objects.create(username=instance,
                                    first_name=instance.first_name,
                                    last_name=instance.last_name,
                                    email=instance.email
                                    )
        