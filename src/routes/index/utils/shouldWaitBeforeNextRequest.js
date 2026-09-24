var oneMinuteMs = 60 * 1000;

var shouldWaitBeforeNextRequest = (lastReportRequestTimestamp) => {
  var nextRequestDelayMs = 0;

  if (lastReportRequestTimestamp === 0) {
    return { nextRequestDelayMs };
  }

  var currentTimeMs = Date.now();
  var difference = currentTimeMs - lastReportRequestTimestamp > oneMinuteMs;
  var hasMinutePassed = difference > oneMinuteMs;

  if (hasMinutePassed) {
    return { nextRequestDelayMs };
  }

  return { nextRequestDelayMs: difference };
};

export default shouldWaitBeforeNextRequest;
