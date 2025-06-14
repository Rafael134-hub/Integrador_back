from django.db import models

class Sensor(models.Model):
    TIPOS_SENSORES = [
        ("contador", "contador"),
        ("umidade", "umidade"),
        ("temperatura", "temperatura"),
        ("luminosidade", "luminosidade")
    ]

    sensor = models.CharField(max_length=255, choices=TIPOS_SENSORES)
    mac_adress = models.CharField(max_length=255)
    unidade_med = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.BooleanField()
   
class Ambiente(models.Model):
    sig = models.IntegerField()
    descricao = models.CharField(max_length=255)
    ni = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=255)

class Historico(models.Model):
    id_sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    id_ambiente = models.ForeignKey(Ambiente, on_delete=models.CASCADE)
    valor = models.FloatField()
    timestamp = models.DateTimeField()