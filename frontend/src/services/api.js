const base =
  import.meta.env.VITE_API_BASE ||
  "https://smart-waste-tracker.onrender.com/api";


async function request(path, opts = {}) {
  try {
    const res = await fetch(base + path, {
      headers: { "Content-Type": "application/json" },
      ...opts,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Network error");
    }

    return res.json().catch(() => null);
  } catch (err) {
    console.error("API error:", err.message);
    return null;
  }
}

export default {
  // GET /api/truck-locations/
  async getTruckLocations() {
    return (
      (await request("/truck-locations/")) || [
        { truck_id: "t1", latitude: 28.7, longitude: 77.1 },
      ]
    );
  },

  // POST /api/reports/
  async createComplaint(body) {
    return request("/reports/", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  // GET /api/disposals/ (with pagination & filtering support)
  async getDisposals(params = "") {
    // Example: params = "?status=Pending&page=1&limit=5"
    return request("/disposals/" + params);
  },

  // GET /api/disposals/latest/
  async getLatestDisposal() {
    return request("/disposals/latest/");
  },

  // POST /api/optimize-route/
  async optimizeRoute(payload) {
    return request("/optimize-route/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Mock AI (frontend-side simulation)
  async predictNotificationTime() {
    return new Promise((res) =>
      setTimeout(
        () =>
          res({
            best_time: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
            channel: "push",
            prob_ack: 0.82,
          }),
        600
      )
    );
  },

  async predictEta() {
    return new Promise((res) =>
      setTimeout(() => res({ eta_minutes: 12, delay_prob: 0.12 }), 400)
    );
  },


async createReport(body) {
  return request("/reports/", {
    method: "POST",
    body: JSON.stringify(body),
  });
},

async toggleSimulation(enabled) {
  return request(`/reports/simulate/`, {
    method: "POST",
    body: JSON.stringify({ enabled }),
  });
},

async getReports(query = "") {
  return request(`/reports/${query}`);
},

async updateReportStatus(id, status) {
  return request(`/reports/${id}/update_status/`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
},

async getDriverConduct() {
  return request("/driver-conduct/");
},

};


