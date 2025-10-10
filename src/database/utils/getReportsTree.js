// var { DatabaseError } = require("../../../../customError");

var getReportsTree = async (collection, userId) => {
  try {
    var reportTree = await collection.findOne({ userId });

    return reportTree;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportsTree;
