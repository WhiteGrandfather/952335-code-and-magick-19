'use strict';

var NUMBER_OF_WIZARDS = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rg (241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var calcRandom = function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getWizardName = function (names, surnames) {
  return names[calcRandom(0, names.length)] + ' ' + surnames[calcRandom(0, surnames.length)];
};

var renderWizards = function () {
  var wizardsList = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    var wizard = {};

    wizard.name = getWizardName(NAMES, SURNAMES);
    wizard.coatColor = COAT_COLORS[calcRandom(0, COAT_COLORS.length)];
    wizard.eyesColor = EYES_COLORS[calcRandom(0, EYES_COLORS.length)];

    wizardsList.push(wizard);
  }
  return wizardsList;
};

var renderWizard = function (index) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = renderWizards()[index].name;
  wizardElement.querySelector('.wizard-coat').style.fill = renderWizards()[index].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = renderWizards()[index].eyesColor;

  return wizardElement;
};

for (var j = 0; j < NUMBER_OF_WIZARDS; j++) {
  fragment.appendChild(renderWizard(j));
}

similarListElement.appendChild(fragment);

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
