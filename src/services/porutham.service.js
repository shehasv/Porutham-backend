const { NAKSHATRAS, RASIS, GANAS, RAJJUS, YONIS, VEDHA } = require('../utils/constants');

const poruthamRules = {
  // 1. Dina Porutham
  dina: (boy, girl) => {
    const distance = (girl.nakshatraIndex - boy.nakshatraIndex + 27) % 27;
    const goodDistances = [2, 4, 6, 8, 9, 11, 13, 15, 18, 20, 22, 24, 26];
    return goodDistances.includes(distance);
  },

  // 2. Gana Porutham
  gana: (boy, girl) => {
    const boyGana = GANAS[boy.nakshatra];
    const girlGana = GANAS[girl.nakshatra];
    if (boyGana === girlGana) return true;
    if (boyGana === 'Deva' && girlGana === 'Manushya') return true;
    // Asura generally bad with others
    return false;
  },

  // 3. Yoni Porutham (Mock logical comparison)
  yoni: (boy, girl) => {
    const boyYoni = YONIS[boy.nakshatra];
    const girlYoni = YONIS[girl.nakshatra];
    // Rule: Enemies like Tiger/Cow, Dog/Hare are bad.
    const enemies = [
      ['Cow', 'Tiger'], ['Elephant', 'Lion'], ['Horse', 'Buffalo'],
      ['Dog', 'Hare'], ['Serpent', 'Mongoose'], ['Monkey', 'Sheep'], ['Rat', 'Cat']
    ];
    for (let pair of enemies) {
      if ((pair[0] === boyYoni && pair[1] === girlYoni) || (pair[1] === boyYoni && pair[0] === girlYoni)) {
        return false;
      }
    }
    return true; // Neutral or friendly
  },

  // 4. Rasi Porutham
  rasi: (boy, girl) => {
    // Basic: Boy should ideally be more than 6 signs away from girl, or in specific friendly signs.
    const distance = (boy.rasiIndex - girl.rasiIndex + 12) % 12;
    if (distance === 6) return false; // 7th sign is sometimes good, sometimes bad.
    if (distance === 1) return false; // 2nd sign (Dwitiya) bad
    return true; // Simplified
  },

  // 5. Rasyadhipa
  rasyadhipa: (boy, girl) => {
    // Need mapping of Rasi Lords.
    return true; // Simplified placeholder
  },

  // 6. Mahendra
  mahendra: (boy, girl) => {
    const distance = (boy.nakshatraIndex - girl.nakshatraIndex + 27) % 27;
    return [3, 6, 9, 12, 15, 18, 21, 24].includes(distance);
  },

  // 7. Stree Deergha
  streeDeergha: (boy, girl) => {
    const distance = (boy.nakshatraIndex - girl.nakshatraIndex + 27) % 27;
    return distance >= 15;
  },

  // 8. Vasya
  vasya: (boy, girl) => {
    // specific sign compatibilities.
    return true; // Simplified placeholder
  },

  // 9. Rajju
  rajju: (boy, girl) => {
    // CRITICAL: Cannot be same Rajju
    return RAJJUS[boy.nakshatra] !== RAJJUS[girl.nakshatra];
  },

  // 10. Vedha
  vedha: (boy, girl) => {
    const boyVedha = VEDHA[boy.nakshatra];
    const girlVedha = VEDHA[girl.nakshatra];
    return boyVedha !== girl.nakshatra && girlVedha !== boy.nakshatra;
  }
};

function calculatePorutham(boyAstro, girlAstro) {
  const results = {};
  let score = 0;
  const metrics = Object.keys(poruthamRules);
  
  for (let rule of metrics) {
    const pass = poruthamRules[rule](boyAstro, girlAstro);
    results[rule] = pass;
    if (pass) score++;
  }

  return {
    poruthams: results,
    score,
    total: metrics.length,
    verdict: score >= 6 ? 'Compatible' : 'Not Compatible' // Typically 6+ out of 10 is considered passing. Rajju and Vedha are veto points physically.
  };
}

module.exports = { calculatePorutham };
