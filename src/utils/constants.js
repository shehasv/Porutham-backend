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

module.exports = { NAKSHATRAS, RASIS, GANAS, RAJJUS, YONIS, VEDHA };
