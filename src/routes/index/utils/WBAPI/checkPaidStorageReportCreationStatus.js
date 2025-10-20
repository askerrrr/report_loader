var { WBAPIError } = require("../../../../customError");

var getCreationStatus = async (url, token, userId) => {
  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (!res.ok) {
    var errMsg = "Возникла ошибка при получении отчета о платном хранении";

    throw new WBAPIError(userId, res.status, errMsg);
  }

  var result = await res.json();

  var { status } = result?.data;

  return { status };
};

var checkPaidStorageReportCreationStatus = async (taskId, token, userId) => {
  var url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/status`;

  var { status } = await getCreationStatus(url, token, userId);

  if (status == "done") {
    return true;
  }

  return await new Promise((resolve, reject) => {
    var attempts = 0;

    try {
      var timerId = setInterval(async () => {
        var { status } = await getCreationStatus(url, token, userId);

        if (status === "done") {
          clearInterval(timerId);
          resolve(true);
        }

        if (attempts > 1) {
          clearInterval(timerId);
          resolve(false);
        }

        ++attempts;
      }, 5000);
    } catch {
      clearInterval(timerId);
      resolve(false);
    }
  });
};

module.exports = checkPaidStorageReportCreationStatus;
