const Astronomy = require('astronomy-engine');

function getMoonLongitude(date, lat, lng) {
  const time = Astronomy.MakeTime(date);
  const observer = new Astronomy.Observer(lat, lng, 0);
  const moon = Astronomy.Equator('Moon', time, observer, true, true);
  const eclip = Astronomy.Ecliptic(moon.vec);
  let lon = eclip.elon;
  if (lon < 0) lon += 360;
  return lon;
}

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

const RASIS = [
  'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
  'Tula', 'Vrischika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
];

const dateObj = new Date('1999-01-27T09:30');
const moonLon = getMoonLongitude(dateObj, 10.845624, 76.0336891);
const ayanamsa = 24.1;
let siderealLon = moonLon - ayanamsa;
if (siderealLon < 0) siderealLon += 360;
if (siderealLon >= 360) siderealLon -= 360;

const nakshatraIndex = Math.floor(siderealLon / (360 / 27));
const nakshatraName = NAKSHATRAS[nakshatraIndex];
const rasiIndex = Math.floor(siderealLon / 30);
const rasiName = RASIS[rasiIndex];
const pada = Math.floor((siderealLon % (360 / 27)) / (360 / 108)) + 1;

console.log({ siderealLon, nakshatraIndex, nakshatraName, rasiIndex, rasiName, pada });
