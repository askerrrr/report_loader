var isFutureDate = (dateTo) => {
  var currentTimeStamp = new Date().getTime();
  var timestampFromDateTo = new Date(dateTo).getTime();

  return timestampFromDateTo >= currentTimeStamp;
};

export default isFutureDate;
