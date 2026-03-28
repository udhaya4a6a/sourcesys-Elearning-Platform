from rest_framework import serializers
from .models import Enrollment
from courses.serializers import CourseSerializer

class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    course_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'course_id', 'progress', 'enrolled_at']