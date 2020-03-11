'use strict';
(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var calcRandom = function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getWizardName = function (names, surnames) {
    return names[calcRandom(0, names.length)] + ' ' + surnames[calcRandom(0, surnames.length)];
  };

  var getEnterEvent = function (entErevt, action) {
    if (entErevt.key === ENTER_KEY) {
      action();
    }
  };

  var getEscEvent = function (escEvt, action) {
    if (escEvt.key === ESC_KEY) {
      action();
    }
  };

  window.util = {
    calcRandom: calcRandom,
    getWizardName: getWizardName,
    getEnterEvent: getEnterEvent,
    getEscEvent: getEscEvent
  };
}
)();
