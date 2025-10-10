var s3 = require("../s3");

var collectImagesAsBase64 = async (userId, skus) => {
  var array = [];

  for (var { skuName } of skus) {
    var objectKey = "skuname=" + skuName + ";" + "userId=" + userId;

    var base64 = await s3.getFile(objectKey);
    array.push({ skuName, base64 });
  }

  return array;
};

module.exports = collectImagesAsBase64;
