
from django.http import HttpResponse

def get_status(request):
    return HttpResponse("Status from localDB")