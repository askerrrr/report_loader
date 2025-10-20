var { WBAPIError } = require("../../../../customError/");

var getPaidStorageReportByTaskIdFromWBAPI = async (taskId, token, userId) => {
  var url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/download`;

  var res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (res.ok) {
    var paidStorageReport = await res.json();

    return paidStorageReport;
  }

  var errMsg = "Возникла ошибка при получении отчета о платном хранении, попробуйте позже";

  if (res.status === 429) {
    errMsg = "Подождите минуту перед получением нового отчёта о платном хранении";
  } else if (res.status === 401) {
    errMsg =
      "Не удалось авторизоваться для получения отчета о платном хранении с помощью сохраненного токена. Получить токен с нужными правами можно получить в личном кабинете продавца";
  }

  throw new WBAPIError(userId, res.status, errMsg);
};

module.exports = getPaidStorageReportByTaskIdFromWBAPI;
