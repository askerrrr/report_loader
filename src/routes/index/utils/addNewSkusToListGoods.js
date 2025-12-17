var addNewSkusToListGoods = async (listGoods, skusFromFinancialReports) => {
  for (var { name, id } of skusFromFinancialReports) {
    var existSku = listGoods.find((item) => item.id === id);

    if (!existSku) {
      listGoods.push({ id, skuName: name, deleted: true });
    }

    if (existSku && existSku.deleted) {
      listGoods.push({ ...existSku, deleted: false });
    }
  }

  return { updatedListGoods: listGoods };
};

module.exports = addNewSkusToListGoods;
