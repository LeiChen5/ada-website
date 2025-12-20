const HEATMAP_INSIGHTS_URL = new URL('../data/heatmapInsights.json', import.meta.url).href;
let heatmapInsightsCache = null;

async function loadHeatmapInsights() {
  if (heatmapInsightsCache) return heatmapInsightsCache;
  const response = await fetch(HEATMAP_INSIGHTS_URL);
  if (!response.ok) throw new Error('Failed to load heatmap insights');
  heatmapInsightsCache = await response.json();
  return heatmapInsightsCache;
}

export async function getHeatmapInsight(eventId) {
  if (!eventId) return null;
  const insights = await loadHeatmapInsights();
  return insights.find((item) => Number(item.eventId) === Number(eventId)) || null;
}
