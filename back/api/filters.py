import django_filters
from .models import *

class Sensores_filter(django_filters.FilterSet):
    mac_adress = django_filters.CharFilter(field_name='mac_adress', lookup_expr='icontains')
    sensor = django_filters.CharFilter(field_name='sensor', lookup_expr='icontains')
    status = django_filters.BooleanFilter(field_name='status')

    class Meta:
        model = Sensor
        fields = '__all__'
        
        
class Ambientes_filter(django_filters.FilterSet):
    sig = django_filters.NumberFilter(field_name='sig', lookup_expr='exact')
    descricao = django_filters.CharFilter(field_name='descricao', lookup_expr='icontains')

    class Meta:
        model = Ambiente
        fields = '__all__'
        
        
class Historicos_filter(django_filters.FilterSet):
    id_ambiente = django_filters.NumberFilter(field_name='id_ambiente', lookup_expr='exact')
    id_sensor = django_filters.NumberFilter(field_name='id_sensor', lookup_expr='exact')
    timestamp = django_filters.DateTimeFilter(field_name='timestamp', lookup_expr='exact')
    timestamp_range = django_filters.DateTimeFromToRangeFilter(field_name='timestamp')
    sig = django_filters.NumberFilter(field_name='id_ambiente__sig', lookup_expr='exact')
    descricao = django_filters.CharFilter(field_name='id_ambiente__descricao', lookup_expr='icontains')
    mac_adress = django_filters.CharFilter(field_name='id_sensor__mac_adress', lookup_expr='icontains')
    sensor = django_filters.CharFilter(field_name='id_sensor__sensor', lookup_expr='icontains')
    status = django_filters.BooleanFilter(field_name='id_sensor__status')
    valor = django_filters.NumberFilter(field_name='valor', lookup_expr='exact')

    class Meta:
        model = Historico
        fields = ['id_ambiente', 'id_sensor', 'timestamp']