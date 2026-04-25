const NAKSHATRAS = [
  'Aswathi', 'Bharani', 'Karthika', 'Rohini', 'Makayiram', 'Thiruvathira',
  'Punartham', 'Pooyam', 'Ayilyam', 'Makam', 'Pooram', 'Uthram',
  'Atham', 'Chithira', 'Chothi', 'Visakham', 'Anizham', 'Thrikketta',
  'Moolam', 'Pooradam', 'Uthradam', 'Thiruvonam', 'Avittam', 'Chathayam',
  'Pooruruttathi', 'Uthrattathi', 'Revathi'
];

const RASIS = [
  'Medam', 'Edavam', 'Midhunam', 'Karkidakam', 'Chingam', 'Kanni',
  'Thulam', 'Vrischikam', 'Dhanu', 'Makaram', 'Kumbham', 'Meenam'
];

const GANAS = {
  'Aswathi': 'Deva', 'Bharani': 'Manushya', 'Karthika': 'Asura',
  'Rohini': 'Manushya', 'Makayiram': 'Deva', 'Thiruvathira': 'Manushya',
  'Punartham': 'Deva', 'Pooyam': 'Deva', 'Ayilyam': 'Asura',
  'Makam': 'Asura', 'Pooram': 'Manushya', 'Uthram': 'Manushya',
  'Atham': 'Deva', 'Chithira': 'Asura', 'Chothi': 'Deva',
  'Visakham': 'Asura', 'Anizham': 'Deva', 'Thrikketta': 'Asura',
  'Moolam': 'Asura', 'Pooradam': 'Manushya', 'Uthradam': 'Manushya',
  'Thiruvonam': 'Deva', 'Avittam': 'Asura', 'Chathayam': 'Asura',
  'Pooruruttathi': 'Manushya', 'Uthrattathi': 'Manushya', 'Revathi': 'Deva'
};

const RAJJUS = {
  'Aswathi': 'Pada', 'Bharani': 'Kati', 'Karthika': 'Nabhi', 'Rohini': 'Kanth', 'Makayiram': 'Shira',
  'Thiruvathira': 'Kanth', 'Punartham': 'Nabhi', 'Pooyam': 'Kati', 'Ayilyam': 'Pada',
  'Makam': 'Pada', 'Pooram': 'Kati', 'Uthram': 'Nabhi', 'Atham': 'Kanth', 'Chithira': 'Shira',
  'Chothi': 'Kanth', 'Visakham': 'Nabhi', 'Anizham': 'Kati', 'Thrikketta': 'Pada',
  'Moolam': 'Pada', 'Pooradam': 'Kati', 'Uthradam': 'Nabhi', 'Thiruvonam': 'Kanth', 'Avittam': 'Shira',
  'Chathayam': 'Kanth', 'Pooruruttathi': 'Nabhi', 'Uthrattathi': 'Kati', 'Revathi': 'Pada'
};

const YONIS = {
  'Aswathi': 'Horse', 'Bharani': 'Elephant', 'Karthika': 'Sheep', 'Rohini': 'Serpent', 'Makayiram': 'Serpent',
  'Thiruvathira': 'Dog', 'Punartham': 'Cat', 'Pooyam': 'Sheep', 'Ayilyam': 'Cat',
  'Makam': 'Rat', 'Pooram': 'Rat', 'Uthram': 'Cow', 'Atham': 'Buffalo', 'Chithira': 'Tiger',
  'Chothi': 'Buffalo', 'Visakham': 'Tiger', 'Anizham': 'Hare', 'Thrikketta': 'Hare',
  'Moolam': 'Dog', 'Pooradam': 'Monkey', 'Uthradam': 'Mongoose', 'Thiruvonam': 'Monkey', 'Avittam': 'Lion',
  'Chathayam': 'Horse', 'Pooruruttathi': 'Lion', 'Uthrattathi': 'Cow', 'Revathi': 'Elephant'
};

const VEDHA = {
  'Aswathi': 'Thrikketta', 'Bharani': 'Anizham', 'Karthika': 'Visakham', 'Rohini': 'Chothi',
  'Thiruvathira': 'Thiruvonam', 'Punartham': 'Uthradam', 'Pooyam': 'Pooradam', 'Ayilyam': 'Moolam',
  'Makam': 'Revathi', 'Pooram': 'Uthrattathi', 'Uthram': 'Pooruruttathi', 'Atham': 'Chathayam',
  'Makayiram': 'Chithira'
};

const RASI_LORDS = {
  'Medam': 'Mars', 'Vrischikam': 'Mars',
  'Edavam': 'Venus', 'Thulam': 'Venus',
  'Midhunam': 'Mercury', 'Kanni': 'Mercury',
  'Karkidakam': 'Moon',
  'Chingam': 'Sun',
  'Dhanu': 'Jupiter', 'Meenam': 'Jupiter',
  'Makaram': 'Saturn', 'Kumbham': 'Saturn'
};

const PLANETARY_FRIENDSHIP = {
  'Sun': { friends: ['Moon', 'Mars', 'Jupiter'], neutral: ['Mercury'], enemies: ['Venus', 'Saturn'] },
  'Moon': { friends: ['Sun', 'Mercury'], neutral: ['Mars', 'Jupiter', 'Venus', 'Saturn'], enemies: [] },
  'Mars': { friends: ['Sun', 'Moon', 'Jupiter'], neutral: ['Venus', 'Saturn'], enemies: ['Mercury'] },
  'Mercury': { friends: ['Sun', 'Venus'], neutral: ['Mars', 'Jupiter', 'Saturn'], enemies: ['Moon'] },
  'Jupiter': { friends: ['Sun', 'Moon', 'Mars'], neutral: ['Saturn'], enemies: ['Mercury', 'Venus'] },
  'Venus': { friends: ['Mercury', 'Saturn'], neutral: ['Mars', 'Jupiter'], enemies: ['Sun', 'Moon'] },
  'Saturn': { friends: ['Mercury', 'Venus'], neutral: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars'] }
};

const VASYA_RASI_PAIRS = {
  'Medam': ['Chingam', 'Vrischikam'],
  'Edavam': ['Karkidakam', 'Thulam'],
  'Midhunam': ['Kanni'],
  'Karkidakam': ['Vrischikam', 'Dhanu'],
  'Chingam': ['Thulam'],
  'Kanni': ['Midhunam', 'Meenam'],
  'Thulam': ['Makaram'],
  'Vrischikam': ['Karkidakam', 'Kanni'],
  'Dhanu': ['Meenam'],
  'Makaram': ['Medam', 'Kumbham'],
  'Kumbham': ['Medam'],
  'Meenam': ['Makaram']
};

module.exports = { NAKSHATRAS, RASIS, GANAS, RAJJUS, YONIS, VEDHA, RASI_LORDS, PLANETARY_FRIENDSHIP, VASYA_RASI_PAIRS };
