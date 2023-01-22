from django.contrib import admin

from .models import AgentProfile 


class AgentProfileAdmin(admin.ModelAdmin):
    
    list_display = ['first_name','last_name','username','email']
    list_display_links = ['first_name','last_name','username','email']
    search_fields = ['first_name','last_name','username']

admin.site.register(AgentProfile, AgentProfileAdmin)