const base = import.meta.env.VITE_API_BASE || "http://localhost:4000";

async function request(path, opts = {}) {
  try {
    const res = await fetch(base + path, {
      headers: { "Content-Type": "application/json" },
      ...opts,
    });
    if (!res.ok) throw new Error("Network error");
    return res.json().catch(() => null);
  } catch (err) {
    // fallback mock behavior
    return null;
  }
}

export default {
  async getTruckLocations() {
    return request("/trucks") || [{ truck_id: "t1", lat: 28.7, lng: 77.1 }];
  },

  async createPickupRequest(body) {
    // POST /api/pickup-requests (real backend)
    return request("/pickup-requests", { method: "POST", body: JSON.stringify(body) });
  },

  async createComplaint(body) {
    return request("/complaints", { method: "POST", body: JSON.stringify(body) });
  },

  async predictNotificationTime(payload) {
    // mock response
    return new Promise((res) =>
      setTimeout(() => res({ best_time: new Date(Date.now() + 60 * 60 * 1000).toISOString(), channel: "push", prob_ack: 0.82 }), 600)
    );
  },

  async predictEta(payload) {
    return new Promise((res) => setTimeout(() => res({ eta_minutes: 12, delay_prob: 0.12 }), 400));
  },
};
