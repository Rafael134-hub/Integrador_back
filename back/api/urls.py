from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('sensores', listar_sensores),
    path('ambientes', listar_ambientes),
    path('historicos', listar_historicos),
    path('sensor', SensoresView.as_view()),
    path('ambiente', AmbientesView.as_view()),
    path('historico', HistoricosView.as_view()),
    path('sensor/<int:pk>', SensoresDetailView.as_view()),
    path('ambiente/<int:pk>', AmbientesDetailView.as_view()),
    path('historico/<int:pk>', HistoricosDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('upload-xlsx-ambientes/',  UploadXLSXViewAmbiente.as_view()),
    path('upload-xlsx-sensores/',  UploadXLSXViewSensores.as_view())
]