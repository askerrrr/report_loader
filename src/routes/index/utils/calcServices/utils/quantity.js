var calcQuantity = async (report) =>
  report.filter((item) => item.doc_type_name === "Продажа").reduce((acc, i) => acc + i.quantity, 0);

export default calcQuantity;
