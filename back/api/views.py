from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.contrib.auth.models import User


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_sensores(request):
    if request.method == 'GET':
        queryset = Sensor.objects.all()
        serializer = Sensor_serializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = Sensor_serializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

class SensoresView(ListCreateAPIView):
    queryset = Sensor.objects.all()
    serializer_class = Sensor_serializer
    permission_classes = [IsAuthenticated]

class SensoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Sensor.objects.all()
    serializer_class = Sensor_serializer
    permission_classes = [IsAuthenticated]



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_ambientes(request):
    if request.method == 'GET':
        queryset = Ambiente.objects.all()
        serializer = Ambiente_serializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = Ambiente_serializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

class AmbientesView(ListCreateAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = Ambiente_serializer
    permission_classes = [IsAuthenticated]

class AmbientesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = Ambiente_serializer
    permission_classes = [IsAuthenticated]



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_historicos(request):
    if request.method == 'GET':
        queryset = Historico.objects.all()
        serializer = Historico_serializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = Historico_serializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

class HistoricosView(ListCreateAPIView):
    queryset = Historico.objects.all()
    serializer_class = Historico_serializer
    permission_classes = [IsAuthenticated]

class HistoricosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Historico.objects.all()
    serializer_class = Historico_serializer
    permission_classes = [IsAuthenticated]



class SignUpView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
