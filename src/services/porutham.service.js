const { NAKSHATRAS, RASIS, GANAS, RAJJUS, YONIS, VEDHA, RASI_LORDS, PLANETARY_FRIENDSHIP, VASYA_RASI_PAIRS } = require('../utils/constants');

const poruthamRules = {
  // 1. Dina Porutham
  dina: (boy, girl) => {
    const count = (boy.nakshatraIndex - girl.nakshatraIndex + 27) % 27 + 1;
    const remainder = count % 9;
    return [0, 2, 4, 6, 8].includes(remainder);
  },

  // 2. Gana Porutham
  gana: (boy, girl) => {
    const boyGana = GANAS[boy.nakshatra];
    const girlGana = GANAS[girl.nakshatra];
    if (boyGana === girlGana) return true;
    if (boyGana === 'Deva' && girlGana === 'Manushya') return true;
    if (boyGana === 'Manushya' && girlGana === 'Deva') return true;
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
    // Count from girl's rasi to boy's rasi
    const count = (boy.rasiIndex - girl.rasiIndex + 12) % 12 + 1;
    // 2, 6, 8, 12 are generally considered inauspicious
    if ([2, 6, 8, 12].includes(count)) return false;
    return true;
  },

  // 5. Rasyadhipa
  rasyadhipa: (boy, girl) => {
    const boyLord = RASI_LORDS[boy.rasi];
    const girlLord = RASI_LORDS[girl.rasi];
    if (boyLord === girlLord) return true;
    
    const boyLordFriendship = PLANETARY_FRIENDSHIP[boyLord];
    const girlLordFriendship = PLANETARY_FRIENDSHIP[girlLord];
    
    // Check if they are mutual enemies, or one is enemy
    if (boyLordFriendship.enemies.includes(girlLord) || girlLordFriendship.enemies.includes(boyLord)) {
      return false;
    }
    
    return true; // Friends or neutral
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
    const boyVasyaRasis = VASYA_RASI_PAIRS[boy.rasi] || [];
    const girlVasyaRasis = VASYA_RASI_PAIRS[girl.rasi] || [];
    // Compatible if either is vasya to the other
    return boyVasyaRasis.includes(girl.rasi) || girlVasyaRasis.includes(boy.rasi);
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
