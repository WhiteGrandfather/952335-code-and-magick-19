'use strict';

var PLAYER_NAME = 'Вы';
var FONT_COLOR = '#000000';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 90;
var TEXT_WIDTH = 50;
var TEXT_HEIGHT = 260;
var BAR_WIDTH = 40;
var FONT_STYLE = '16px PT Mono';
var FONT_X = 120;
var FONT_Y = 40;
var LINE_HEIGHT = 20;
var cloudText = 'Ура вы победили! \nСписок результатов:';
var barHeight = TEXT_WIDTH + FONT_GAP;
var shadowColor = 'rgba(0, 0, 0, 0,7)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var cloud = function (ctx) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, shadowColor);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
};

var maxTime = function (arr) {
  return Math.max.apply(null, arr);
};

var randomBlue = function (names, index) {
  if (names[index] === PLAYER_NAME) {
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

var column = function (ctx, names, times, index) {
  var barTopPadding = barHeight * times[index] / maxTime(times);

  ctx.fillStyle = FONT_COLOR;
  ctx.fillText(Math.round(times[index]), TEXT_WIDTH + FONT_GAP + FONT_GAP * index, TEXT_HEIGHT - GAP * 2 - CLOUD_Y - barTopPadding);
  ctx.fillText(names[index], TEXT_WIDTH + FONT_GAP + FONT_GAP * index, TEXT_HEIGHT);
  ctx.fillStyle = randomBlue(names, index);
  ctx.fillRect(TEXT_WIDTH + FONT_GAP + FONT_GAP * index, TEXT_HEIGHT - CLOUD_Y - GAP - barTopPadding, BAR_WIDTH, barTopPadding);
};

var renderColumn = function (ctx, names, times) {
  for (var i = 0; i < names.length; i++) {
    column(ctx, names, times, i);
  }
};

var renderFont = function (ctx) {
  var lines = cloudText.split('\n');

  for (var i = 0; i < lines.length; i++) {
    ctx.font = FONT_STYLE;
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(lines[i], FONT_X, FONT_Y + (i * LINE_HEIGHT));
  }
};

window.renderStatistics = function (ctx, names, times) {
  cloud(ctx);

  renderFont(ctx);

  renderColumn(ctx, names, times);
};
