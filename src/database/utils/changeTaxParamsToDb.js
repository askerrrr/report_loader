var changeTaxParamsToDb = async (collection, userId, session, newTaxParams) => {
  var count = 0;
  var query = {};
  var arrayFilters = [];

  for (var taxParams of newTaxParams) {
    var arrayFiltersKey = `elem${count}.year`;
    var arrayFiltersValue = taxParams.year;
    arrayFilters.push({ [arrayFiltersKey]: arrayFiltersValue });

    for (var key of Object.keys(taxParams)) {
      query[`years.$[elem${count}].${key}`] = taxParams[key];
    }

    count++;
  }

  var result = await collection.updateOne({ userId }, { $set: query }, { arrayFilters });

  return result.acknowledged;
};

export default changeTaxParamsToDb;
