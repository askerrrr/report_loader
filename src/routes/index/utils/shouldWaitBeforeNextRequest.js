var shouldWaitBeforeNextRequest = (lastReportRequestTimestamp) => {
  var nextRequestDelaySec = 0;

  if (lastReportRequestTimestamp === 0) {
    return { nextRequestDelaySec };
  }

  var { currentTimeMs } = getCurrentTimeStamp();
  var difference = currentTimeMs - lastReportRequestTimestamp > oneMinuteMs;
  var hasMinutePassed = difference > oneMinuteMs;

  if (hasMinutePassed) {
    return { nextRequestDelaySec };
  }

  return { nextRequestDelaySec: difference };
};

module.exports = shouldWaitBeforeNextRequest;
