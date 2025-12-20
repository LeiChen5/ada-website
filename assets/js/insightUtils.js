const INSIGHTS_URL = new URL('../data/eventSectorInsights.json', import.meta.url).href;
let insightsCache = null;

async function loadInsights() {
  if (insightsCache) return insightsCache;
  const response = await fetch(INSIGHTS_URL);
  if (!response.ok) throw new Error('Failed to load event-sector insights');
  insightsCache = await response.json();
  return insightsCache;
}

export async function getInsight(eventId, sectorKey) {
  if (!eventId || !sectorKey) return null;
  const insights = await loadInsights();
  return insights.find(
    (item) => Number(item.eventId) === Number(eventId) && String(item.sectorKey) === String(sectorKey)
  ) || null;
}
