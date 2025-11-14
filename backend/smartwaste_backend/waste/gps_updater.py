import os
import sys
import django
import random
import time

sys.path.append(os.path.dirname(os.path.abspath(__file__)))  # waste/
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # smartwaste_backend/
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))  # backend/


# Go up one level from app to find settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smartwaste_backend.settings')
os.chdir(os.path.dirname(os.path.abspath(__file__)))  # ensure relative paths are fine
os.chdir('..')  # move to backend directory

django.setup()

from waste.models import TruckLocation

def simulate_movement():
    while True:
        trucks = TruckLocation.objects.all()
        if not trucks.exists():
            print("No trucks found. Please add some truck data first.")
            time.sleep(5)
            continue

        for truck in trucks:
            # Slow & realistic movement
            truck.latitude += random.uniform(-0.002, 0.002)
            truck.longitude += random.uniform(-0.002, 0.002)
            truck.save()
            print(f"Updated Truck {truck.truck_id} -> ({round(truck.latitude,5)}, {round(truck.longitude,5)})")

        time.sleep(3)   # smoother refresh


if __name__ == "__main__":
    simulate_movement()
