var { WBAPIError } = require("../../../../../customError");

var getWeeklyFinancialReportFromWBAPI = async (dateFrom, dateTo, token, userId) => {
  var url = `https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod?dateFrom=${dateFrom}&dateTo=${dateTo}`;

  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (res.status === 200) {
    var report = await res.json();
    return report;
  } else if (res.status === 204) {
    return [];
  }

  switch (res.status) {
    case 400:
      errMsg = "Неправильный запрос";
      break;
    case 401:
      errMsg = "Не удалось авторизоваться с помощью сохраненного токена";
      break;
    case 429:
      errMsg = "Подождите минуту перед получением нового отчёта";
      break;
    case 402:
      errMsg = "Требуется платеж";
      break;
    default:
      errMsg = "Возникла ошибка при получении финансового отчета, попробуйте позже";
  }

  throw new WBAPIError(userId, res.status, errMsg);
};

module.exports = getWeeklyFinancialReportFromWBAPI;
