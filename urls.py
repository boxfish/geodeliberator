from django.conf.urls.defaults import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
#from django.contrib.gis import admin
admin.autodiscover()

import views

urlpatterns = staticfiles_urlpatterns()

urlpatterns += patterns('',
    # Example:
    # (r'^geodeliberator/', include('geodeliberator.foo.urls')),
    (r'^api/', include('api.urls')),
	url(r'^$', views.index, name='index'),

    # Uncomment the admin/doc line below and add 'django.contrib.admindocs' 
    # to INSTALLED_APPS to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
    # (r'^geodeliberator_service/', include('geodeliberator.geodeliberator_service.urls')),
)
