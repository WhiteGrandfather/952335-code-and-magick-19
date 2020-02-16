'use strict';

var numberOfWizards = 4;
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rg (241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];
var fragment = document.createDocumentFragment();

var calcRandom = function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var wizardsNames = function (name, surname) {
  return name[calcRandom(0, name.length)] + ' ' + surname[calcRandom(0, surname.length)];
};

for (var i = 0; i < numberOfWizards; i++) {
  var wizard = {};

  wizard.name = wizardsNames(NAMES, SURNAMES);
  wizard.coatColor = COAT_COLORS[calcRandom(0, COAT_COLORS.length)];
  wizard.eyesColor = EYES_COLORS[calcRandom(0, EYES_COLORS.length)];

  wizards.push(wizard);
}

for (var j = 0; j < numberOfWizards; j++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[j].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[j].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[j].eyesColor;

  fragment.appendChild(wizardElement);
}

similarListElement.appendChild(fragment);

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
