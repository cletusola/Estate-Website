from django.db import models
from django.contrib.auth import get_user_model 
User = get_user_model()

from datetime import date 

# listing model 
class Listing(models.Model):
    Contract_Type = (
        ('Sale','Sale'),
        ('Rent','Rent'),
        ('Sale or Rent', 'Rent or Sale'),
    )

    # custom model for rent listing
    class RentListing(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(contract_type='rent')
    
    # custom model for sale listing
    class SaleListing(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(contract_type='sale')

    # custom model for both listing
    class BothListing(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(contract_type='Sale or Rent')

    name = models.CharField(max_length=120, verbose_name="House Name", null=True, blank=True)
    address = models.CharField(max_length=300, verbose_name="Address", null=False, blank=False)
    contract_type = models.CharField(max_length=30, choices=Contract_Type, default="sale",
                    verbose_name="Contract Type", null=False, blank=False)
    price = models.CharField(max_length=20, verbose_name="Price", null=False, blank=False)
    area = models.CharField(max_length=20, verbose_name="Area", null=False, blank=False)
    bed = models.IntegerField(verbose_name="Bed", null=False, blank=False)
    bath = models.IntegerField(verbose_name="Bath", null=False, blank=False)
    garage = models.IntegerField(verbose_name="Garages", null=False, blank=False)
    description = models.TextField(null=False,blank=False)
    image1 = models.ImageField(upload_to=f"houses/{date.today()}", null=False, blank=False)
    image2 = models.ImageField(upload_to=f"houses/{date.today()}", null=False, blank=False)
    image3 = models.ImageField(upload_to=f"houses/{date.today()}", null=False, blank=False)
    image4 = models.ImageField(upload_to=f"houses/{date.today()}", null=True, blank=True)
    image5 = models.ImageField(upload_to=f"houses/{date.today()}", null=True, blank=True)
    image6 = models.ImageField(upload_to=f"houses/{date.today()}", null=True, blank=True)
    image7 = models.ImageField(upload_to=f"houses/{date.today()}", null=True, blank=True)
    image8 = models.ImageField(upload_to=f"houses/{date.today()}", null=True, blank=True)
    image9 = models.ImageField(upload_to=f"houses/{date.today()}", null=True, blank=True)
    image10 = models.ImageField(upload_to=f"houses/{date.today()}", null=True, blank=True)
    agent = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    date = models.DateField(auto_now_add=True, null=False,blank=False)

    objects = models.Manager() # default model manager
    rent = RentListing() # rent model manager
    sale = SaleListing() # sale model manager 
    both = BothListing() # both model manager

    def __str__(self): 
        return self.name 


