// var { DatabaseError } = require("../../../../customError");

var changePaidTaxAmountToDb = async (collection, userId, year, paidTaxAmount) => {
  try {
    var result = await collection.updateOne(
      { userId, "years.year": year },
      {
        $set: { "years.$.paidTaxAmount": paidTaxAmount },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    //throw new DatabaseError(userId, e);
  }
};

module.exports = changePaidTaxAmountToDb;
