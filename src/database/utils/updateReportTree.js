// var { DatabaseError } = require("../../../../customError");

var updateReportsTree = async (collection, userId, years) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $set: { years: years },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = updateReportsTree;
