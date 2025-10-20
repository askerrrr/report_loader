var { WBAPIError } = require("../../../../customError/");

var createPaidStorageReportTask = async (dateFrom, dateTo, token, userId) => {
  var url = `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage?dateFrom=${dateFrom}&dateTo=${dateTo}`;

  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (res.ok) { 
    var { data } = await res.json();

    return { taskId: data.taskId };
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

module.exports = createPaidStorageReportTask;
