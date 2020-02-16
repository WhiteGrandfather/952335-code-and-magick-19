'use strict';

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizards = [
  {
    name: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон']
  },
  {
    name: ['Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
  },
  {
    coatColor: ['rgb(101, 137, 164)', 'rg (241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  },
  {
    eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
  }
];

var calcRandom = function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var wizardName = function (name, surname) {
  return name[calcRandom(0, name.length)] + ' ' + surname[calcRandom(0, surname.length)];
};

for (var i = 0; i < 4; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizardName(wizards[0].name, wizards[1].name);
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[2].coatColor[calcRandom(0, wizards[2].coatColor.length)];
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[3].eyesColor[calcRandom(0, wizards[3].eyesColor)];

  similarListElement.appendChild(wizardElement);
}

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
