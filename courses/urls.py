from django.urls import path
from .views import CourseListView, CourseDetailView, LessonCreateView

urlpatterns = [
    path('', CourseListView.as_view(), name='course-list'),
    path('<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path('<int:pk>/lessons/', LessonCreateView.as_view(), name='lesson-create'),
]