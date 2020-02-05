'use strict';

var fontColor = '#000000';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 90;
var TEXT_WIDTH = 50;
var TEXT_HEIGHT = 260;
var BAR_WIDTH = 40;
var barHeight = TEXT_WIDTH + FONT_GAP;
var shadowColor = 'rgba(0, 0, 0, 0,7)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = fontColor;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, shadowColor);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barTopPadding = barHeight * times[i] / maxTime;
    var randomBlue = function () {
      if (names[i] === 'Вы') {
        return 'rgba(255, 0, 0, 1)';
      } else {
        var randomIntensity = function getRandomIntInclusive(min, max) {
          min = Math.ceil(1);
          max = Math.floor(100);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        return 'hsl(240, ' + randomIntensity() + '%' + ', 50%)';
      }
    };

    ctx.fillStyle = fontColor;
    ctx.fillText(Math.round(times[i]), TEXT_WIDTH + FONT_GAP + FONT_GAP * i, TEXT_HEIGHT - GAP * 2 - CLOUD_Y - barTopPadding);
    ctx.fillText(names[i], TEXT_WIDTH + FONT_GAP + FONT_GAP * i, TEXT_HEIGHT);
    ctx.fillStyle = randomBlue();
    ctx.fillRect(TEXT_WIDTH + FONT_GAP + FONT_GAP * i, TEXT_HEIGHT - CLOUD_Y - GAP - barTopPadding, BAR_WIDTH, barTopPadding);
  }
};
