from django.conf.urls.defaults import *

from geodeliberator_service.views import * 

urlpatterns = patterns('',
    url(r'^(?P<pathname>.*)', proxy, name='proxy'),
)

