from django.http import HttpResponse
from django.conf import settings
import urllib, urllib2
import json

# Create your views here.

def proxy(request, pathname):
    """http proxy for external resources"""
    # url = "http://130.203.158.62/lancelot_grail_service/" + pathname
    url = "http://130.203.136.41/SmokeFreeCampusService/" + pathname
    f = None
    if request.method == "GET":
        f = urllib2.urlopen(url)
    elif request.method == "POST":
        #data = urllib.urlencode(request.POST)
        data = request.POST.urlencode()
        f = urllib2.urlopen(url, data)
    response = f.read()
    content_type = f.info()['Content-Type']
    f.close()
    return HttpResponse(response, content_type=content_type)