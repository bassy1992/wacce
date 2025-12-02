from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Student, Programme, StudentProgress

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ProgrammeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programme
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    programme = ProgrammeSerializer(read_only=True)
    
    class Meta:
        model = Student
        fields = '__all__'

class StudentProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProgress
        fields = '__all__'

class StudentRegistrationSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    programme_id = serializers.IntegerField()
    
    class Meta:
        model = Student
        fields = ['user', 'phone_number', 'date_of_birth', 'programme_id', 
                 'previous_school', 'wassce_year', 'index_number']
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        programme_id = validated_data.pop('programme_id')
        
        # Create user
        user = User.objects.create_user(
            username=user_data['username'],
            email=user_data['email'],
            first_name=user_data['first_name'],
            last_name=user_data['last_name']
        )
        
        # Create student
        programme = Programme.objects.get(id=programme_id)
        student = Student.objects.create(
            user=user,
            programme=programme,
            **validated_data
        )
        
        return student