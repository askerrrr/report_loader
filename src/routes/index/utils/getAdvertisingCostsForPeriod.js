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

var calculateTotalAdvertisingСosts = async (data) => data.reduce((acc, i) => acc + i.updSum, 0);

var getAdvertisingCostsForPeriod = async (dateFrom, dateTo, token, userId) => {
  var url = `https://advert-api.wildberries.ru/adv/v1/upd?from=${dateFrom}&to=${dateTo}`;

  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (res.ok) {
    var data = await res.json();

    var totalAdvertisingCosts = await calculateTotalAdvertisingСosts(data);

    return totalAdvertisingCosts;
  }

  var errMsg = "Возникла ошибка при получении отчета о платном хранении, попробуйте позже";

  if (res.status === 429) {
    errMsg = "Подождите минуту перед получением нового отчёта о затратах на рекламу";
  } else if (res.status === 401) {
    errMsg =
      "Не удалось авторизоваться для получения отчета о затратах на рекламу с помощью сохраненного токена. Получить токен с нужными правами можно получить в личном кабинете продавца";
  }
  WBAPIError(userId, res.status, errMsg);
};

module.exports = getAdvertisingCostsForPeriod;
