from django.db import models
from datetime import datetime, timezone

class TruckLocation(models.Model):
    truck_id = models.CharField(max_length=100, unique=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Truck {self.truck_id} at ({self.latitude}, {self.longitude})"


class Report(models.Model):
    ISSUE_TYPES = [
        ('overflow', 'Overflowing Garbage'),
        ('missed', 'Missed Pickup'),
        ('illegal', 'Illegal Dumping'),
        ('other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
    ]

    user_name = models.CharField(max_length=100)
    email = models.EmailField()
    location = models.CharField(max_length=255)
    issue_type = models.CharField(max_length=20, choices=ISSUE_TYPES)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user_name} - {self.issue_type} - {self.status}"

class DriverConduct(models.Model):
    driver_name = models.CharField(max_length=100)
    truck = models.ForeignKey(TruckLocation, on_delete=models.CASCADE)
    punctuality_score = models.FloatField(default=0)
    route_adherence_score = models.FloatField(default=0)
    stop_behavior_score = models.FloatField(default=0)
    overall_score = models.FloatField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.driver_name} - {self.overall_score}"

class DisposalRecord(models.Model):
    truck_id = models.CharField(max_length=20)
    sector = models.CharField(max_length=50)
    scheduled_time = models.DateTimeField()
    actual_time = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=30, default="Pending")  # On-time, Delayed, Missed
    delay_minutes = models.FloatField(default=0.0)
    predicted_status = models.CharField(max_length=30, null=True, blank=True)
    confidence = models.FloatField(default=0.0)  # 0–1 scale

    def save(self, *args, **kwargs):
        # Calculate delay
        if self.actual_time:
            diff = (self.actual_time - self.scheduled_time).total_seconds() / 60
            self.delay_minutes = max(diff, 0)
            if diff > 10:
                self.status = "Delayed"
            elif diff < -10:
                self.status = "Early"
            else:
                self.status = "On-time"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.truck_id} - {self.status}"

class RouteOptimization(models.Model):
    truck_id = models.CharField(max_length=100)
    sectors = models.JSONField()  # stores input list of sectors
    optimized_route = models.JSONField(null=True, blank=True)
    time_saved = models.FloatField(default=0.0)
    efficiency_gain = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"RouteOptimization({self.truck_id})"