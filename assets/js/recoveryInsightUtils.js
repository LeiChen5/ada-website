const RECOVERY_INSIGHTS_URL = new URL('../data/recoveryInsights.json', import.meta.url).href;
let recoveryInsightsCache = null;

async function loadRecoveryInsights() {
  if (recoveryInsightsCache) return recoveryInsightsCache;
  const response = await fetch(RECOVERY_INSIGHTS_URL);
  if (!response.ok) throw new Error('Failed to load recovery insights');
  recoveryInsightsCache = await response.json();
  return recoveryInsightsCache;
}

export async function getRecoveryInsight(eventId) {
  if (!eventId) return null;
  const insights = await loadRecoveryInsights();
  return insights.find(item => Number(item.eventId) === Number(eventId)) || null;
}
