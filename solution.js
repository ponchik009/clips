const { resolve, writeCLP } = require("./clips.js");

const entries = {
  "Не работает": true,
  // "Проверьте, подключен ли кабель питания. Возможно, кабель неисправен, или же перегорел предохранитель.",
  "Не нагревает": false,
  // "Проверьте, закрыта ли дверца. Если дверца не закрывается, замените дверные защёлки или саму дверцу.",
  Шумит: false,
  // "Причиной шума может быть загрязнение микроволновки. Попробуйте провести чистку.",
};

const instancesToReponse = {
  ConnectPower: "Проверьте, подключено ли питание",
  ReplaceFuse: "Попробуйте заменить предохранитель",
  FixSocket: "Попробуйте починить розетку и кабель питания",
  CleanPollution: "Попробуйте очистить загрязнение",
  ReplaceDoorLatches: "Замените дверные зашёлки или дверцу",
  CloseDoor: "Закройте дверцу микроволновки",
};

module.exports = {
  resolve: (entries) => {
    writeCLP(entries);

    const result = resolve();

    let textResponse = "";

    for (let work in result) {
      textResponse += instancesToReponse[work] + "\n";
    }

    return textResponse;
  },
};
