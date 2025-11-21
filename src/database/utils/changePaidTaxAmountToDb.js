// var { DatabaseError } = require("../../../../customError");

var changePaidTaxAmountToDb = async (collection, userId, year, paidTaxAmount, session) => {
  try {
    var result = await collection.updateOne(
      { userId, "years.year": year },
      {
        $set: { "years.$.paidTaxAmount": paidTaxAmount },
      },
      { session: session }
    );

    return result.modifiedCount;
  } catch (e) {
    //throw new DatabaseError(userId, e);
  }
};

module.exports = changePaidTaxAmountToDb;
