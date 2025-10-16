var checkYearExists = (years, year) => years?.find((date) => date.year === year);

var getYearIndex = (years, year) => years?.findIndex((date) => date.year === year);

module.exports = { getYearIndex, checkYearExists };
