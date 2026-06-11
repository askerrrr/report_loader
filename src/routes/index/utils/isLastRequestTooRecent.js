var isLastRequestTooRecent = (lastReportRequestTimestamp, NEXT_REPORT_DELAY_MS) => {
  var delayInMs = 0;

  var currentTimestamp = new Date(Date.now() + 3 * 60 * 60 * 1000).getTime();

  var difference = currentTimestamp - lastReportRequestTimestamp;

  var needToDalay = difference < NEXT_REPORT_DELAY_MS;

  if (needToDalay) {
    delayInMs = NEXT_REPORT_DELAY_MS - difference;
  }

  return { needToDalay, delayInMs };
};

export default isLastRequestTooRecent;
