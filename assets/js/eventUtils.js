const EVENTS_URL = new URL('../data/events.json', import.meta.url).href;
let eventsCache = null;

async function loadEvents() {
  if (eventsCache) return eventsCache;
  const response = await fetch(EVENTS_URL);
  if (!response.ok) throw new Error('Failed to load events data');
  eventsCache = await response.json();
  return eventsCache;
}

function formatThemes(themes = []) {
  if (Array.isArray(themes)) return themes.join(' / ');
  if (!themes) return '';
  return String(themes);
}

function toTimelineItem(event) {
  return {
    id: event.id,
    content: event.name,
    start: event.start,
    title: `<div class="timeline-tooltip"><strong>${event.name}</strong><br>${event.headline}</div>`
  };
}

export async function getEventNameById(id) {
  const events = await loadEvents();
  const event = events.find(item => item.id === Number(id));
  return event ? event.name : null;
}

export async function getEventItemById(id) {
  const events = await loadEvents();
  const event = events.find(item => item.id === Number(id));
  return event ? toTimelineItem(event) : null;
}

export async function getAllEventItems() {
  const events = await loadEvents();
  return events.map(toTimelineItem);
}

export async function getEventById(id) {
  const events = await loadEvents();
  return events.find(item => item.id === Number(id)) || null;
}

export async function getAllEvents() {
  return loadEvents();
}
