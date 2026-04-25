const { PostHog } = require('posthog-node');
const { Axiom } = require('@axiomhq/js');

// Initialize PostHog
const posthog = new PostHog(process.env.POSTHOG_API_KEY, {
  host: 'https://us.i.posthog.com',
  flushAt: 1, // Flush immediately for serverless/development
  flushInterval: 0
});

// Initialize Axiom
const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN,
});

/**
 * Tracks a compatibility check event to PostHog for product analytics.
 * @param {Object} req - The Express request object
 * @param {Object} matchResult - The resulting porutham score object
 */
const trackMatchEvent = (req, matchResult) => {
  try {
    if (!process.env.POSTHOG_API_KEY) return;

    posthog.capture({
      event: 'Compatibility_Checked',
      distinctId: req.ip || 'anonymous_user',
      properties: {
        boy_nakshatra: req.body?.groom?.nakshatra || req.body?.boy?.nakshatra,
        girl_nakshatra: req.body?.bride?.nakshatra || req.body?.girl?.nakshatra,
        total_score: matchResult.totalScore,
        matches_count: matchResult.matches?.length || 0,
        is_recommended: matchResult.totalScore >= 18,
      }
    });
  } catch (error) {
    console.error("PostHog Analytics Error:", error.message);
  }
};

/**
 * Logs the raw request and response to Axiom for debugging.
 * @param {Object} req - The Express request object
 * @param {Object} matchResult - The resulting porutham score object
 */
const logRawRequest = (req, matchResult) => {
  try {
    if (!process.env.AXIOM_TOKEN) return;

    const dataset = process.env.AXIOM_DATASET || 'api-logs';
    
    axiom.ingest(dataset, [{
      level: 'info',
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      rawInput: req.body,
      rawOutput: matchResult,
      timestamp: new Date().toISOString()
    }]);
  } catch (error) {
    console.error("Axiom Logging Error:", error.message);
  }
};

module.exports = {
  trackMatchEvent,
  logRawRequest,
  posthog // Exported for graceful shutdown if needed
};
