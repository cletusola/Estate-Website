from django.contrib import admin

from .models import Blog 


class BlogAdmin(admin.ModelAdmin):
    list_display = ['title','written_by',]
    list_display_links = ['title','written_by',]
    search_fields = ['written_by','title']
    prepopulated_fields = {'slug':('title','excerpt',)}

admin.site.register(Blog, BlogAdmin)


