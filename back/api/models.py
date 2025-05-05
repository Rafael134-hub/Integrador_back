from django.db import models

class Sensor(models.Model):
    sensor = models.CharField(max_length=255)
    mac_adress = models.CharField(max_length=255)
    unidade_med = models.CharField(max_length=255)
    valor = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.CharField(max_length=255)
    timestamp = models.CharField(max_length=255)

class Ambiente(models.Model):
    sig = models.CharField(max_length=255)
    descricao = models.CharField(max_length=255)
    ni = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=255)

class Historico(models.Model):
    id_sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    id_ambiente = models.ForeignKey(Ambiente, on_delete=models.CASCADE)
    observacoes = models.TextField()