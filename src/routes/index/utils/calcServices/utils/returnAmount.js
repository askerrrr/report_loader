var calcReturnAmount = (report) => {
  var returnAmount = report.filter((item) => item.doc_type_name === "Возврат").length;

  return returnAmount;
};

export default calcReturnAmount;
