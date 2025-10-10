//var { WBAPIError } = require("../../../../customError/");
class WBAPIError extends Error {
  constructor(userId, status, message) {
    super(message);
    this.userId = userId;
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
  }
}

var getReportByPeriodFromWBAPI = async (dateFrom, dateTo, token, userId) => {
  var url = `https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod?dateFrom=${dateFrom}&dateTo=${dateTo}`;

  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (res.ok) {
    var mainReport = await res.json();

    return mainReport;
  }

  var errMsg = "Возникла ошибка при получении финансового отчета, попробуйте позже";

  if (res.status === 429) {
    errMsg = "Подождите минуту перед получением нового отчёта";
  } else if (res.status === 401) {
    errMsg = "Не удалось авторизоваться с помощью сохраненного токена";
  }
  WBAPIError(userId, res.status, errMsg);
};

module.exports = getReportByPeriodFromWBAPI;
