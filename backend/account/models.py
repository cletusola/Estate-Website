from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)

# creating abstract user model 
class UserAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email, password=None):
        if not first_name:
            raise ValueError('FirstName is required')
        elif not last_name:
            raise ValueError('LastName is required')
        elif not username:
            raise ValueError('Username is required')
        elif not email:
            raise ValueError('Email is required')

        email = self.normalize_email(email)
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email
            ) 
        user.set_password(password)
        user.save()

    # super user model
    def create_superuser(self,first_name, last_name, username, email, password=None):
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email
            )

        user.is_superuser = True 
        user.is_staff = True 
        user.set_password(password)
        user.save()

        return user 

    
# user registration model 
class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=30, null=False, blank=False)
    last_name = models.CharField(max_length=30, null=False, blank=False)
    username = models.CharField(max_length=20, unique=True, null=False, blank=False)
    email = models.EmailField(max_length=150, unique=True, null=False, blank=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name','last_name','email']

    def __str__(self):
        return self.username


            
        
