from django.conf.urls.defaults import *

from geoannotator.views import * 

urlpatterns = patterns('',
    url(r'^api/user/$', api_user, name='api_user'),
    url(r'^api/forum/$', api_forum, name='api_forum'),    
    url(r'^api/forums/$', api_forums, name='api_forums'),    
    url(r'^api/authentication/$', api_authentication, name='api_authentication'),        
    url(r'^api/annotations/$', api_annotations, name='api_annotations'),   
    url(r'^api/annotation/$', api_annotation, name='api_annotation'),   
    url(r'^api/map/$', api_map, name='api_map'),   
    url(r'^api/timeline/$', api_timeline, name='api_timeline'),   
    url(r'^api/threads/$', api_threads, name='api_threads'),   
    # urls for compability support with previous version
    url(r'^api/User/$', api_user, name='api_user'),
    url(r'^api/Group/$', api_forum, name='api_forum'),    
    url(r'^api/Groups/$', api_forums, name='api_forums'),        
    url(r'^api/Login/$', api_authentication, name='api_authentication'),        
    url(r'^api/Annotations/$', api_annotations, name='api_annotations'),                
    url(r'^api/Annotation/$', api_annotation, name='api_annotation'),   
    url(r'^api/Map/$', api_map, name='api_map'),   
    url(r'^api/Timeline/$', api_timeline, name='api_timeline'),
    url(r'^api/Threads/$', api_threads, name='api_threads'),              
)

