from django.contrib import admin

from .models import Listing 


class ListingAdmin(admin.ModelAdmin):
    list_display = ['name','contract_type','price','agent']
    list_display_links = ['name','contract_type','price','agent']
    list_filter = ['contract_type','agent']
    search_fields = ['agent','contract_type','price']

admin.site.register(Listing, ListingAdmin)

