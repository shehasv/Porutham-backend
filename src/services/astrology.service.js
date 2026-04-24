const Astronomy = require('astronomy-engine');
const { NAKSHATRAS, RASIS } = require('../utils/constants');

function getMoonLongitude(date, lat, lng) {
  // We use astronomy-engine to calculate the geocentric apparent ecliptic longitude
  // date should be a native Date object.
  const time = Astronomy.MakeTime(date);
  const observer = new Astronomy.Observer(lat, lng, 0);
  const moon = Astronomy.Equator('Moon', time, observer, true, true);
  
  // Convert Topocentric Equator of Date (EQD) to True Ecliptic of Date (ECT)
  const rotMatrix = Astronomy.Rotation_EQD_ECT(time);
  const eclipVector = Astronomy.RotateVector(rotMatrix, moon.vec);
  const spherical = Astronomy.SphereFromVector(eclipVector);
  
  // astronomy-engine spherical gives lon in degrees
  let lon = spherical.lon;
  if (lon < 0) lon += 360;
  return lon;
}

function getAstroDetails({ dob, place }) {
  const dateObj = new Date(dob);
  const moonLon = getMoonLongitude(dateObj, place.lat, place.lng);

  // Lahiri Ayanamsa approximation (rough shift to sidereal) 
  // For strict traditional, we need an exact Ayanamsa offset via swisseph, 
  // but for our stateless engine we'll use a constant or simplified ayanamsa calculation.
  // ~24 degrees roughly right now.
  const ayanamsa = 24.1; // simplified Lahiri
  let siderealLon = moonLon - ayanamsa;
  if (siderealLon < 0) siderealLon += 360;

  // Nakshatra = floor(Moon Long / 13°20')
  const nakshatraIndex = Math.floor(siderealLon / (360 / 27));
  const nakshatraName = NAKSHATRAS[nakshatraIndex];

  // Rasi = floor(Moon Long / 30°)
  const rasiIndex = Math.floor(siderealLon / 30);
  const rasiName = RASIS[rasiIndex];

  // Pada = floor((Moon Long % 13.333) / 3.333) + 1
  const pada = Math.floor((siderealLon % (360 / 27)) / (360 / 108)) + 1;

  return {
    moonLongitude: siderealLon,
    nakshatra: nakshatraName,
    nakshatraIndex,
    rasi: rasiName,
    rasiIndex,
    pada
  };
}

module.exports = { getAstroDetails };
