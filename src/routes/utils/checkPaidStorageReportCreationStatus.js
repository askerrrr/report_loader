//var { WBAPIError } = require("../../../../customError");
class WBAPIError extends Error {
  constructor(userId, status, message) {
    super(message);
    this.userId = userId;
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
  }
}

var getCreationStatus = async (url, token) => {
  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (!res.ok) {
    var errMsg = "Возникла ошибка при получении отчета о платном хранении";

    new WBAPIError("userId", res.status, res.statusText, errMsg);
  }
  var result = await res.json();
  var { status } = result?.data;

  return status;
};

var checkPaidStorageReportCreationStatus = async (taskId, token) => {
  var url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/status`;

  var status = await getCreationStatus(url, token);

  if (status == "done") {
    return true;
  }

  return new Promise((resolve, reject) => {
    var attempts = 0;

    try {
      var timerId = setInterval(async () => {
        var status = await getCreationStatus(url, token);

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
