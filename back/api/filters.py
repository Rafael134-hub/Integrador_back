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