import random

def predict_delay(prob_inputs):
    """
    Simulates ML prediction.
    Takes inputs (distance, traffic_level, weather, etc.) and returns prediction.
    """

    # Randomized prediction for demo
    prob = random.random()
    if prob < 0.6:
        return "On-time", round(random.uniform(0.75, 0.95), 2)
    elif prob < 0.85:
        return "Slight Delay", round(random.uniform(0.6, 0.8), 2)
    else:
        return "Severe Delay", round(random.uniform(0.4, 0.6), 2)
