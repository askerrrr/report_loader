var isLastRequestTooRecent = (
  lastReportRequestTimestamp,
  NEXT_REPORT_DELAY_MS,
) => {
  var delayInMs = 0;

  var currentTimestamp = Date.now();

  var difference = currentTimestamp - lastReportRequestTimestamp;

  var needToDelay = difference < NEXT_REPORT_DELAY_MS;

  if (needToDelay) {
    delayInMs = NEXT_REPORT_DELAY_MS - difference;
  }

  return { needToDelay, delayInMs };
};

export default isLastRequestTooRecent;
