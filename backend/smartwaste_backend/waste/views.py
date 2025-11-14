from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TruckLocation,Report, DriverConduct, DisposalRecord, RouteOptimization
from .serializers import TruckLocationSerializer, ReportSerializer, DriverConductSerializer, DisposalRecordSerializer, RouteOptimizationSerializer
from .ai_model import predict_delay
import random

@api_view(['GET'])
def latest_disposal(request):
    latest = DisposalRecord.objects.order_by('-scheduled_time').first()
    if not latest:
        return Response({"detail": "No disposals found."}, status=404)
    serializer = DisposalRecordSerializer(latest)
    return Response(serializer.data)

class TruckLocationViewSet(viewsets.ModelViewSet):
    queryset = TruckLocation.objects.all().order_by('-updated_at')
    serializer_class = TruckLocationSerializer

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all().order_by('-created_at')
    serializer_class = ReportSerializer

class DriverConductViewSet(viewsets.ModelViewSet):
    queryset = DriverConduct.objects.all().order_by('-overall_score')
    serializer_class = DriverConductSerializer

class DisposalRecordViewSet(viewsets.ModelViewSet):
    queryset = DisposalRecord.objects.all().order_by('-scheduled_time')
    serializer_class = DisposalRecordSerializer

    @action(detail=True, methods=['get'])
    def predict(self, request, pk=None):
        """Predict punctuality for a specific record"""
        record = self.get_object()

        # Simulated inputs
        inputs = {
            "distance_km": random.uniform(1, 5),
            "traffic_level": random.choice(["low", "medium", "high"]),
            "weather": random.choice(["clear", "rainy", "foggy"]),
        }

        prediction, confidence = predict_delay(inputs)
        record.predicted_status = prediction
        record.confidence = confidence
        record.save()

        serializer = DisposalRecordSerializer(record)
        return Response(serializer.data)

class RouteOptimizationView(APIView):
    """
    AI-based route optimization simulation.
    POST example:
    {
        "truck_id": "TRUCK-101",
        "sectors": ["Sector 1", "Sector 3", "Sector 5", "Sector 9"]
    }
    """

    def post(self, request):
        truck_id = request.data.get("truck_id")
        sectors = request.data.get("sectors", [])

        if not truck_id or not sectors:
            return Response(
                {"error": "truck_id and sectors are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 🧠 AI Simulation: random reordering + mock efficiency gain
        optimized_route = random.sample(sectors, len(sectors))
        time_saved = round(random.uniform(5, 25), 2)
        efficiency_gain = round(random.uniform(10, 40), 2)

        # save to DB
        route_opt = RouteOptimization.objects.create(
            truck_id=truck_id,
            sectors=sectors,
            optimized_route=optimized_route,
            time_saved=time_saved,
            efficiency_gain=efficiency_gain,
        )

        serializer = RouteOptimizationSerializer(route_opt)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request):
        """Return latest route optimization results"""
        latest = RouteOptimization.objects.all().order_by("-created_at").first()
        if not latest:
            return Response({"detail": "No route optimizations found."})
        serializer = RouteOptimizationSerializer(latest)
        return Response(serializer.data)
