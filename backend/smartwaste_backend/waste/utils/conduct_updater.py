from waste.models import DriverConduct, TruckLocation
import random

def update_driver_conduct():
    trucks = TruckLocation.objects.all()
    for t in trucks:
        punctuality = random.uniform(70, 100)
        route = random.uniform(60, 100)
        stops = random.uniform(70, 100)
        overall = round((punctuality + route + stops) / 3, 2)
        DriverConduct.objects.update_or_create(
            truck=t,
            defaults={
                "driver_name": f"Driver-{t.truck_id[-3:]}",
                "punctuality_score": punctuality,
                "route_adherence_score": route,
                "stop_behavior_score": stops,
                "overall_score": overall,
            }
        )
