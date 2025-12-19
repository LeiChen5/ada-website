import { getEventById } from './eventUtils.js';
import { getSectorByKey } from './sectorUtils.js';

const BASE_PATH = './assets/img/plots';

// Some images use T0-1 dates; map overrides where filenames differ from event.start
const DATE_OVERRIDES = {
  1: '2001-09-10', // 9/11 event files are stamped 09-10
  6: '2020-03-09'  // COVID files use 03-09 for drawdown/volcano
};

function eventCode(event, forCar = false) {
  const padded = String(event.id).padStart(3, '0');
  if (forCar) {
    return `E${padded}_${event.start}`;
  }
  const date = DATE_OVERRIDES[event.id] || event.start;
  return `E${padded}_${date}`;
}

function encodeFolder(name) {
  return encodeURIComponent(name);
}

export async function getChartPaths(eventId, sectorKey) {
  const [event, sector] = await Promise.all([
    getEventById(eventId),
    getSectorByKey(sectorKey)
  ]);

  if (!event || !sector) {
    return {
      car: '',
      drawdown: '',
      volcano: ''
    };
  }

  const sectorFolder = encodeFolder(sector.folderName || sector.label);
  const carRef = eventCode(event, true);
  const otherRef = eventCode(event, false);

  return {
    car: `${BASE_PATH}/chapter1/CAR_plots/CAR_charts_static_${sectorFolder}/${carRef}.png`,
    drawdown: `${BASE_PATH}/chapter1/drawdown_curve_plots/drawdown_charts_${sectorFolder}/${otherRef}.png`,
    volcano: `${BASE_PATH}/chapter1/volcano_plots/volcano_charts_${sectorFolder}/volcano_${otherRef}.png`
  };
}
