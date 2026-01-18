from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TruckLocationViewSet, ReportViewSet, DriverConductViewSet, DisposalRecordViewSet, latest_disposal, RouteOptimizationView, toggle_simulation


router = DefaultRouter()
router.register(r'truck-locations', TruckLocationViewSet)
router.register(r'reports', ReportViewSet)
router.register(r'driver-conduct', DriverConductViewSet)
router.register(r'disposals', DisposalRecordViewSet)


urlpatterns = [
    path('disposals/latest/', latest_disposal, name='latest_disposal'),
    path("optimize-route/", RouteOptimizationView.as_view(), name="optimize-route"),
    path('reports/simulate/', toggle_simulation),
    path('', include(router.urls)),
]
