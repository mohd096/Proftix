# from rest_framework import serializers
# from .models import User


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user
    
#     def update(self, instance, validated_data):
#         user = User.objects.get(pk=instance.pk)
#         user.set_password(validated_data['password'])
#         user.save()
#         return user
    

