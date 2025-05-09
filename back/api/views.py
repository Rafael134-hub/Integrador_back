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
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from openpyxl import load_workbook

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


class UploadXLSXViewAmbiente(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')

        if not file_obj:
            return Response({'erro': 'Arquivo não enviado'}, status=400)

        wb = load_workbook(filename=file_obj)
        ws = wb.active  # primeira aba
        
        for i, row in enumerate(ws.iter_rows(min_row=2, values_only=True)):  # pula o cabeçalho
            sig = str(row[0]).strip() if row[0] is not None else None
            descricao = str(row[1]).strip() if row[1] is not None else None
            ni = str(row[2]).strip() if row[2] is not None else None
            responsavel = str(row[3]).strip() if row[3] is not None else None
            
            if not ni:
                    print(f"[Linha {i+2}] Erro: ni vazio. Dados: {row}")
                
            Ambiente.objects.create(
                sig=row[0],
                descricao=row[1],
                ni=row[2],
                responsavel=row[3],
            )

        return Response({'mensagem': 'Dados importados com sucesso!'})
    


class UploadXLSXViewSensores(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')

        if not file_obj:
            return Response({'erro': 'Arquivo não enviado'}, status=400)

        wb = load_workbook(filename=file_obj)
        ws = wb.active  # primeira aba
            
        for i, row in enumerate(ws.iter_rows(min_row=2, values_only=True)):  # pula o cabeçalho
            sensor = str(row[0]).strip() if row[0] is not None else None
            mac_adress = str(row[1]).strip() if row[1] is not None else None
            unidade_med = str(row[2]).strip() if row[2] is not None else None
            latitude = str(row[3]).strip() if row[3] is not None else None
            longitude = str(row[4]).strip() if row[4] is not None else None
            status = str(row[5]).strip() if row[5] is not None else None
                
            if not sensor:
                    print(f"[Linha {i+2}] Erro: sensor vazio. Dados: {row}")
                    
            Sensor.objects.create(
                sensor = row[0],
                mac_adress = row[1],
                unidade_med = row[2],
                latitude = row[3],
                longitude = row[4],
                status = bool(row[5]),
            )

        return Response({'mensagem': 'Dados importados com sucesso!'})