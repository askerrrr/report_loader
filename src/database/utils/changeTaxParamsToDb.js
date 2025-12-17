var { DatabaseError } = require("../../customError");

var changeTaxParamsToDb = async (collection, userId, year, session, newTaxParams) => {
  try {
    var query = {};

    for (var key of Object.keys(newTaxParams)) {
      query[`years.$.${key}`] = newTaxParams[key];
    }

    var result = await collection.updateOne(
      { userId, "years.year": year },
      { $set: query },
      { session: session }
    );

    return result.acknowledged;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = changeTaxParamsToDb;
