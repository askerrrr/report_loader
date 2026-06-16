var mskTimeOffsetInMs = 3 * 60 * 60 * 1000;

var getCurrentTimeStamp = () => {
  return { currentTimeMs: Date.now() + mskTimeOffsetInMs };
};

export default getCurrentTimeStamp;
