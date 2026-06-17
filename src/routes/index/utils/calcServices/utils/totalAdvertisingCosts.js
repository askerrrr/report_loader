var calculateTotalAdvertisingCosts = (data) => {
  return data.reduce((acc, i) => acc + i.updSum, 0);
};

export default calculateTotalAdvertisingCosts;
