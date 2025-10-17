// var { DatabaseError } = require("../../../../customError");

var saveReportToDb = async (collection, userId, report) => {
  try {
    var result = await collection.updateOne(
      { userId },
      {
        $push: {
          reports: { $each: [report], $position: 0 },
        },
      }
    );

    return result.acknowledged;
  } catch (e) {
    console.log({ e });
    //throw new DatabaseError(userId, e);
  }
};

module.exports = saveReportToDb;
