const { z } = require('zod');
const { getAstroDetails } = require('../services/astrology.service');
const { calculatePorutham } = require('../services/porutham.service');
const { trackMatchEvent, logRawRequest } = require('../utils/telemetry');

const personSchema = z.object({
  name: z.string(),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid datetime string"
  }),
  place: z.object({
    lat: z.number(),
    lng: z.number(),
  })
});

const matchPayloadSchema = z.object({
  bride: personSchema,
  groom: personSchema
});

async function matchHoroscope(req, res, next) {
  try {
    const { bride, groom } = matchPayloadSchema.parse(req.body);

    const brideAstro = getAstroDetails(bride);
    const groomAstro = getAstroDetails(groom);

    const matchAnalysis = calculatePorutham(groomAstro, brideAstro); // Notice: Many rules compute boy relative to girl, or vice versa, our porutham logic assumes boy first.

    const responsePayload = {
      bride: {
        name: bride.name,
        nakshatra: brideAstro.nakshatra,
        rasi: brideAstro.rasi,
        pada: brideAstro.pada
      },
      groom: {
        name: groom.name,
        nakshatra: groomAstro.nakshatra,
        rasi: groomAstro.rasi,
        pada: groomAstro.pada
      },
      ...matchAnalysis
    };

    res.json(responsePayload);

    // Fire and forget telemetry logging asynchronously
    setImmediate(() => {
      trackMatchEvent(req, matchAnalysis);
      logRawRequest(req, responsePayload);
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation Failed', details: error.errors });
    }
    next(error);
  }
}

module.exports = { matchHoroscope };
