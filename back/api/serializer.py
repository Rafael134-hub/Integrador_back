from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class Sensor_serializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'

class Ambiente_serializer(serializers.ModelSerializer):
    class Meta:
        model = Ambiente
        fields = '__all__'

class Historico_serializer(serializers.ModelSerializer):

    sensor = Sensor_serializer(read_only=True, source='id_sensor')
    id_sensor = serializers.PrimaryKeyRelatedField(
        queryset=Sensor.objects.all()
    )

    ambiente = Ambiente_serializer(read_only=True, source='id_ambiente')
    id_ambiente = serializers.PrimaryKeyRelatedField(
        queryset=Ambiente.objects.all()
    )

    class Meta:
        model = Historico
        fields = ["id", "id_sensor", "sensor", "id_ambiente", "ambiente", "valor", "timestamp"]


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user