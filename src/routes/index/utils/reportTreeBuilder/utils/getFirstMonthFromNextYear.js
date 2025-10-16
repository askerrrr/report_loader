var getFirstMonthFromNextYear = (months) => months[11] ?? { month: "январь", reportIds: new Array(5).fill(null) };

module.exports = getFirstMonthFromNextYear;
