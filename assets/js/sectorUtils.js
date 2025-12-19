const SECTORS_URL = new URL('../data/sectors.json', import.meta.url).href;
let sectorsCache = null;

async function loadSectors() {
  if (sectorsCache) return sectorsCache;
  const response = await fetch(SECTORS_URL);
  if (!response.ok) throw new Error('Failed to load sectors data');
  sectorsCache = await response.json();
  return sectorsCache;
}

export async function getSectorLabelByKey(key) {
  const sectors = await loadSectors();
  const sector = sectors.find(item => String(item.key) === String(key));
  return sector ? sector.label : null;
}

export async function getSectorByKey(key) {
  const sectors = await loadSectors();
  return sectors.find(item => String(item.key) === String(key)) || null;
}

export async function getAllSectors() {
  return loadSectors();
}
