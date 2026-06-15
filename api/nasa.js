export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";
  const { type } = req.query;

  const safeFetch = async (url) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const r = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch (e) {
      clearTimeout(timeout);
      throw new Error(`Fetch failed for ${url}: ${e.message}`);
    }
  };

  try {
    if (type === "apod") {
      const d = await safeFetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
      return res.status(200).json(d);
    }

    if (type === "asteroids") {
      const today = new Date();
      const end = today.toISOString().slice(0, 10);
      const start = new Date(today - 7 * 86400000).toISOString().slice(0, 10);
      const d = await safeFetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${API_KEY}`);

      const all = Object.values(d.near_earth_objects || {}).flat();
      const asteroids = all.map(a => ({
        id: a.id,
        name: a.name,
        date: a.close_approach_data[0]?.close_approach_date,
        diameterMin: a.estimated_diameter.meters.estimated_diameter_min,
        diameterMax: a.estimated_diameter.meters.estimated_diameter_max,
        velocity: parseFloat(a.close_approach_data[0]?.relative_velocity.kilometers_per_hour || 0),
        missDistanceKm: parseFloat(a.close_approach_data[0]?.miss_distance.kilometers || 0),
        missDistanceLunar: parseFloat(a.close_approach_data[0]?.miss_distance.lunar || 0),
        isHazardous: a.is_potentially_hazardous_asteroid,
      })).sort((a, b) => a.missDistanceKm - b.missDistanceKm);

      return res.status(200).json({
        total: asteroids.length,
        hazardous: asteroids.filter(a => a.isHazardous).length,
        safe: asteroids.filter(a => !a.isHazardous).length,
        asteroids: asteroids.slice(0, 20),
        byDay: Object.entries(d.near_earth_objects || {}).map(([date, list]) => ({
          date: date.slice(5),
          count: list.length,
          hazardous: list.filter(a => a.is_potentially_hazardous_asteroid).length,
        })).sort((a, b) => a.date < b.date ? -1 : 1),
      });
    }

    if (type === "eonet") {
      const d = await safeFetch(`https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=50`);
      const events = (d.events || []).map(e => ({
        id: e.id,
        title: e.title,
        category: e.categories?.[0]?.title || "Unknown",
        date: e.geometry?.[0]?.date?.slice(0, 10),
      }));
      const byCategory = {};
      events.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + 1; });
      return res.status(200).json({
        total: events.length,
        events: events.slice(0, 15),
        byCategory: Object.entries(byCategory).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
      });
    }

    if (type === "apod_week") {
      const dates = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000);
        dates.push(d.toISOString().slice(0, 10));
      }
      const start = dates[0], end = dates[dates.length - 1];
      const d = await safeFetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${start}&end_date=${end}`);
      return res.status(200).json(Array.isArray(d) ? d : [d]);
    }

    return res.status(400).json({ error: "Unknown type" });

  } catch (e) {
    return res.status(500).json({ error: e.message || "NASA API error" });
  }
}
