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
    data = django_filters.CharFilter(method='filter_por_data') 
    hora = django_filters.CharFilter(method='filter_por_hora')

    class Meta:
        model = Historico
        fields = ['id_ambiente', 'id_sensor', 'data', 'hora']
        
    def filter_por_data(self, queryset, name, value):
        value = value.replace("-", "")
        value = value.replace("/", "")
        value = value.replace("_", "")
        value = value.replace(".", "")
        value = value.replace(" ", "")
        value = value.replace(":", "")
        if len(value) != 8:
            return queryset.none()
        
        value_int = int(value) 

        return queryset.extra(
            where=["CAST(timestamp AS TEXT) LIKE %s"],
            params=[str(value_int) + '%']
        )
    
    
    def filter_por_hora(self, queryset, name, value):
        value = value.replace("-", "")
        value = value.replace("/", "")
        value = value.replace("_", "")
        value = value.replace(".", "")
        value = value.replace(" ", "")
        value = value.replace(":", "")
        if len(value) != 6:
            return queryset.none()
        return queryset.extra(
            where=["SUBSTR(CAST(timestamp AS TEXT), 9, 6) = %s"],
            params=[value]
        )
        
        