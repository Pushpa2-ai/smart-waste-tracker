from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TruckLocation,Report, DriverConduct, DisposalRecord, RouteOptimization
from .serializers import TruckLocationSerializer, ReportSerializer, DriverConductSerializer, DisposalRecordSerializer, RouteOptimizationSerializer
from .ai_model import predict_delay
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from django.utils import timezone
import uuid
import random

@api_view(['GET'])
def latest_disposal(request):
    latest = DisposalRecord.objects.order_by('-scheduled_time').first()
    if not latest:
        return Response({"detail": "No disposals found."}, status=404)
    serializer = DisposalRecordSerializer(latest)
    return Response(serializer.data)

class DisposalRecordPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    max_page_size = 50

class ReportPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'limit'
    max_page_size = 50

class TruckLocationViewSet(viewsets.ModelViewSet):
    queryset = TruckLocation.objects.all().order_by('-updated_at')
    serializer_class = TruckLocationSerializer

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all().order_by('-created_at')
    serializer_class = ReportSerializer

    # Pagination + Filtering
    pagination_class = ReportPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'status',
        'issue_type',
        'location',
    ]

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        """
        PATCH /api/reports/{id}/update_status/
        Body:
        {
            "status": "in_progress"
        }
        """
        report = self.get_object()
        new_status = request.data.get("status")

        valid_statuses = ["pending", "in_progress", "resolved"]

        if new_status not in valid_statuses:
            return Response(
                {"error": "Invalid status value"},
                status=status.HTTP_400_BAD_REQUEST
            )

        report.status = new_status
        report.save()

        serializer = ReportSerializer(report)
        return Response(serializer.data)


@api_view(["POST"])
def toggle_simulation(request):
    """
    POST /api/reports/simulate/
    Body:
    {
      "enabled": true
    }
    """
    enabled = request.data.get("enabled", False)

    if not enabled:
        return Response({"message": "Simulation disabled"})

    actions = []

    # 70% chance to create a new report
    if random.random() < 0.7:
        fake = Report.objects.create(
            user_name="Demo User",
            email=f"demo-{uuid.uuid4().hex[:6]}@smartwaste.io",
            location=f"Sector {random.randint(1, 10)}",
            issue_type=random.choice(["overflow", "missed", "illegal", "other"]),
            description="Auto-generated demo report",
            status="pending",
        )
        actions.append(f"Created report {fake.id}")

    # 50% chance to progress an old report
    candidates = Report.objects.exclude(status="resolved").order_by("created_at")[:1]
    for r in candidates:
        if random.random() < 0.5:
            old_status = r.status
            if r.status == "pending":
                r.status = "in_progress"
            elif r.status == "in_progress":
                r.status = "resolved"
            r.save()
            actions.append(f"Updated report {r.id}: {old_status} → {r.status}")

    return Response({
        "message": "Simulation tick executed",
        "actions": actions,
        "timestamp": timezone.now()
    })

class DriverConductViewSet(viewsets.ModelViewSet):
    queryset = DriverConduct.objects.all().order_by('-overall_score')
    serializer_class = DriverConductSerializer

class DisposalRecordViewSet(viewsets.ModelViewSet):
    queryset = DisposalRecord.objects.all().order_by('-scheduled_time')
    serializer_class = DisposalRecordSerializer

    # Pagination + Filtering
    pagination_class = DisposalRecordPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'status',
        'sector',
        'truck_id',
        'predicted_status',
    ]

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
