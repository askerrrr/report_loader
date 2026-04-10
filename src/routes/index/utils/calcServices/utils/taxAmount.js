var taxAmount = (retailAmount, taxRate) => {
  if (taxRate === 0) {
    return 0;
  }

  var tax = (retailAmount * taxRate) / 100;

  return tax;
};

export default taxAmount;
