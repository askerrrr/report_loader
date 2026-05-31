var freshReportPeriodIndexIsInvalid = (index) =>
  typeof index === "undefined" || typeof +index !== "number" || isNaN(+index) || index < 0 || index === null;

export default freshReportPeriodIndexIsInvalid;
