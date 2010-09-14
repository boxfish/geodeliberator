from django.conf.urls.defaults import *
from django.views.generic.simple import redirect_to
from django.conf import settings
import django
import os

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
#from django.contrib.gis import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^geodeliberator/', include('geodeliberator.foo.urls')),

    # Uncomment the admin/doc line below and add 'django.contrib.admindocs' 
    # to INSTALLED_APPS to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
    (r'^geoannotator/', include('geodeliberator.geoannotator.urls')),
    (r'^geodeliberator_service/', include('geodeliberator.geodeliberator_service.urls')),
)

urlpatterns += patterns('',(r'^admin_media/(.*)', 'django.views.static.serve', {'document_root': os.path.join(django.__path__[0],'contrib/admin/media/')}),)

if settings.DEBUG:
    urlpatterns += patterns('',
        (r'^geodeliberator/(.*)', 'django.views.static.serve', {'document_root': os.path.join(os.path.abspath(os.path.dirname(__file__)), 'geodeliberator_client')}),
)
