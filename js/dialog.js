'use strict';

(function () {
  var setupWindowElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');
  var setupUserName = setupWindowElement.querySelector('.setup-user-name');
  var dialogHandler = setupWindowElement.querySelector('.upload');

  var onKeydownEnterClosePopup = function (evt) {
    window.util.getEnterEvent(evt, closePopup);
  };

  var onKeydownEnterOpenPopup = function (evt) {
    window.util.getEnterEvent(evt, openPopup);
  };

  var onPopupEscPress = function (evt) {
    window.util.getEscEvent(evt, closePopup);
  };

  var stopPropagation = function (evt) {
    evt.stopPropagation();
  };

  var onDialogHandlerMousedownDrag = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.cliemtX,
      y: evt.clientY
    };

    var isDragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupWindowElement.style.top = (setupWindowElement.offsetTop - shift.y) + 'px';
      setupWindowElement.style.left = (setupWindowElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var setupWindowElementPositionreset = function () {
    setupWindowElement.style.top = '';
    setupWindowElement.style.left = '';
  };

  var openPopup = function () {
    setupWindowElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupWindowElement.addEventListener('click', window.setup.onClickWizardColorChange);
    setupCloseElement.addEventListener('click', closePopup);
    setupCloseElement.addEventListener('keydown', onKeydownEnterClosePopup);
    setupUserName.addEventListener('keydown', stopPropagation);
    setupOpenElement.removeEventListener('click', openPopup);
    setupOpenElement.removeEventListener('keydown', onKeydownEnterOpenPopup);
    dialogHandler.addEventListener('mousedown', onDialogHandlerMousedownDrag);
  };

  var closePopup = function () {
    setupWindowElement.classList.add('hidden');
    setupWindowElementPositionreset();
    document.removeEventListener('keydown', onPopupEscPress);
    setupWindowElement.removeEventListener('click', window.setup.onClickWizardColorChange);
    setupCloseElement.removeEventListener('click', closePopup);
    setupCloseElement.removeEventListener('keydown', onKeydownEnterClosePopup);
    setupUserName.removeEventListener('keydown', stopPropagation);
    setupOpenElement.addEventListener('click', openPopup);
    setupOpenElement.addEventListener('keydown', onKeydownEnterOpenPopup);
    dialogHandler.removeEventListener('mousedown', onDialogHandlerMousedownDrag);
  };

  setupOpenElement.addEventListener('click', openPopup);
  setupOpenElement.addEventListener('keydown', onKeydownEnterOpenPopup);
})();
