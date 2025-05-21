from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('sensores/', SensoresView.as_view()),
    path('ambientes/', AmbientesView.as_view()),
    path('historicos/', HistoricosView.as_view()),
    path('sensor/', SensoresView.as_view()),
    path('ambiente/', AmbientesView.as_view()),
    path('historico/', HistoricosView.as_view()),
    path('sensor/<int:pk>/', SensoresDetailView.as_view()),
    path('ambiente/<int:pk>/', AmbientesDetailView.as_view()),
    path('historico/<int:pk>/', HistoricosDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('upload-xlsx-ambientes/',  UploadXLSXViewAmbiente.as_view()),
    path('upload-xlsx-sensores/',  UploadXLSXViewSensores.as_view()),
    path('upload-xlsx-historicos/',  UploadXLSXViewHistoricos.as_view()),
    path('exportar/historicos/',  exportar_historicos_excel, name='exportar_historicos'),
    path('exportar/sensores/',  exportar_sensores_excel, name='exportar_sensores'),
    path('exportar/ambientes/',  exportar_ambientes_excel, name='exportar ambientes')
]