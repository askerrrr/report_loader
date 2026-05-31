import parseJwt from "./parseJwt.js";

var tokenIsExpired = (token) => {
  var payload = parseJwt(token);
  var currentTimestamp = new Date(Date.now() + 3 * 60 * 60).getTime();

  return !payload?.exp || payload.exp * 1000 <= currentTimestamp;
};

export default tokenIsExpired;
