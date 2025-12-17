var calcAverageStorageCost = (totalStorageCost, totalSold, qty) => {
  if (!qty) {
    return 0;
  }

  var averageStorageCost = (totalStorageCost / totalSold) * qty;

  return averageStorageCost;
};

module.exports = calcAverageStorageCost;
