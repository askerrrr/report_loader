import { WBAPIError } from "../../../../../customError/index.js";

var requriedFields = [
  "nmId",
  "forPay",
  "dateTo",
  "quantity",
  "reportId",
  "penalty",
  "dateFrom",
  "vendorCode",
  "deduction",
  "reportType",
  "paidStorage",
  "docTypeName",
  "retailAmount",
  "deliveryService",
  "paidAcceptance",
  "additionalPayment",
];

var getWeeklyFinancialReportFromWBAPI = async (dateFrom, dateTo, token, userId) => {
  try {
    var url = "https://finance-api.wildberries.ru/api/finance/v1/sales-reports/detailed";

    var res = await fetch(url, {
      method: "POST",
      body: { dateFrom, dateTo, fields: requriedFields },
      headers: { Authorization: "Bearer " + token },
    });

    if (res.status === 200) {
      var report = await res.json();
      return report;
    } else if (res.status === 204) {
      return [];
    }

    var errMsg;

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
  } catch (e) {
    throw new WBAPIError(userId, 500, "Не удалось подключиться к WBAPI" + "\n" + e.message);
  }
};

export default getWeeklyFinancialReportFromWBAPI;
