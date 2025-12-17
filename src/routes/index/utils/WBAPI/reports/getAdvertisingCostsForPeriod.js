var { WBAPIError } = require("../../../../../customError");

var getAdvertisingCostsForPeriod = async (dateFrom, dateTo, token, userId) => {
  var url = `https://advert-api.wildberries.ru/adv/v1/upd?from=${dateFrom}&to=${dateTo}`;

  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (res.ok) {
    var advertisingReport = await res.json();

    if (!advertisingReport.length) {
      return [];
    }

    return advertisingReport;
  }

  var errMsg = "Возникла ошибка при получении отчета о платном хранении, попробуйте позже";

  if (res.status === 429) {
    errMsg = "Подождите минуту перед получением нового отчёта о затратах на рекламу";
  } else if (res.status === 401) {
    errMsg =
      "Не удалось авторизоваться для получения отчета о затратах на рекламу с помощью сохраненного токена. Получить токен с нужными правами можно получить в личном кабинете продавца";
  }

  throw new WBAPIError(userId, res.status, errMsg);
};

module.exports = getAdvertisingCostsForPeriod;
