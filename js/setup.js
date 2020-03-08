'use strict';

var NUMBER_OF_WIZARDS = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var setupWindow = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupUserName = setupWindow.querySelector('.setup-user-name');
var setupWizard = setupWindow.querySelector('.setup-wizard');
var setupPlayer = document.querySelector('.setup-player');
var fireball = setupWindow.querySelector('.setup-fireball-wrap');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyesColorInput = setupPlayer.querySelector('input[name="eyes-color"]');
var wizardCoatColorInput = setupPlayer.querySelector('input[name="coat-color"]');
var wizardFireballColorInput = setupPlayer.querySelector('input[name="fireball-color"]');

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

setupWindow.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupWindow.addEventListener('click', onClickWizardColorChange);
  setupClose.addEventListener('click', closePopup);
  setupClose.addEventListener('keydown', onKeydownEnterClosePopup);
  setupUserName.addEventListener('keydown', stopPropagation);
  setupOpen.removeEventListener('click', openPopup);
  setupOpen.removeEventListener('keydown', onKeydownEnterOpenPopup);
};

var closePopup = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupWindow.removeEventListener('click', onClickWizardColorChange);
  setupClose.removeEventListener('click', closePopup);
  setupClose.removeEventListener('keydown', onKeydownEnterClosePopup);
  setupUserName.removeEventListener('keydown', stopPropagation);
  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', onKeydownEnterOpenPopup);
};

var onKeydownEnterClosePopup = function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
};

var onKeydownEnterOpenPopup = function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
};

var stopPropagation = function (evt) {
  evt.stopPropagation();
};

var getPlayerNewEyesColor = function () {
  wizardEyes.style.fill = EYES_COLORS[calcRandom(0, EYES_COLORS.length)];
  wizardEyesColorInput.value = wizardEyes.style.fill;
};

var getPlayerNewCoatColor = function () {
  wizardCoat.style.fill = COAT_COLORS[calcRandom(0, COAT_COLORS.length)];
  wizardCoatColorInput.value = wizardCoat.style.fill;
};

var getPlayerNewFireballColor = function () {
  fireball.style.backgroundColor = FIREBALL_COLORS[calcRandom(0, FIREBALL_COLORS.length)];
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

document.addEventListener('keydown', onPopupEscPress);
setupWindow.addEventListener('click', onClickWizardColorChange);
setupClose.addEventListener('click', closePopup);
