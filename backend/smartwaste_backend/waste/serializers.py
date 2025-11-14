from rest_framework import serializers
from .models import TruckLocation, Report, DriverConduct, DisposalRecord, RouteOptimization

class TruckLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TruckLocation
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

class DriverConductSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverConduct
        fields = '__all__'

class DisposalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisposalRecord
        fields = '__all__'

class RouteOptimizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RouteOptimization
        fields = "__all__"