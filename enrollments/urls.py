from django.urls import path
from .views import EnrollView, MyCourcesView

urlpatterns = [
    path('enroll/', EnrollView.as_view(), name='enroll'),
    path('my-courses/', MyCourcesView.as_view(), name='my-courses'),
]