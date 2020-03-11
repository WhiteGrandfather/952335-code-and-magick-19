'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var NUMBER_OF_WIZARDS = 4;
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragmentElement = document.createDocumentFragment();
  var setupWindowElement = document.querySelector('.setup');
  var setupWizard = setupWindowElement.querySelector('.setup-wizard');
  var setupPlayerElement = document.querySelector('.setup-player');
  var fireball = setupWindowElement.querySelector('.setup-fireball-wrap');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyesColorInput = setupPlayerElement.querySelector('input[name="eyes-color"]');
  var wizardCoatColorInput = setupPlayerElement.querySelector('input[name="coat-color"]');
  var wizardFireballColorInput = setupPlayerElement.querySelector('input[name="fireball-color"]');

  var getRandomColors = function (colors) {
    var randomColors = colors[window.util.calcRandom(0, colors.length)];

    return randomColors;
  };

  var renderWizards = function () {
    var wizardsList = [];
    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      var wizard = {};

      wizard.name = window.util.getWizardName(NAMES, SURNAMES);
      wizard.coatColor = getRandomColors(COAT_COLORS);
      wizard.eyesColor = getRandomColors(EYES_COLORS);

      wizardsList.push(wizard);
    }
    return wizardsList;
  };

  var renderWizard = function (index) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = renderWizards()[index].name;
    wizardElement.querySelector('.wizard-coat').style.fill = renderWizards()[index].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = renderWizards()[index].eyesColor;

    return wizardElement;
  };

  for (var j = 0; j < NUMBER_OF_WIZARDS; j++) {
    fragmentElement.appendChild(renderWizard(j));
  }

  similarListElement.appendChild(fragmentElement);

  document.querySelector('.setup-similar').classList.remove('hidden');

  var getPlayerNewEyesColor = function () {
    wizardEyes.style.fill = getRandomColors(EYES_COLORS);
    wizardEyesColorInput.value = wizardEyes.style.fill;
  };

  var getPlayerNewCoatColor = function () {
    wizardCoat.style.fill = getRandomColors(COAT_COLORS);
    wizardCoatColorInput.value = wizardCoat.style.fill;
  };

  var getPlayerNewFireballColor = function () {
    fireball.style.backgroundColor = getRandomColors(FIREBALL_COLORS);
    wizardFireballColorInput.value = fireball.style.backgroundColor;
  };

  var onClickWizardColorChange = function (evt) {
    if (evt.target && evt.target.matches('.wizard-eyes')) {
      getPlayerNewEyesColor();
    } else if (evt.target && evt.target.matches('.wizard-coat')) {
      getPlayerNewCoatColor();
    } else if (evt.target && evt.target.matches('.setup-fireball')) {
      getPlayerNewFireballColor();
    }
  };
  setupWindowElement.addEventListener('click', onClickWizardColorChange);
  window.setup = {
    onClickWizardColorChange: onClickWizardColorChange
  };
})();
