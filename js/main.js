const View = require('./ttt-view');
const Game = require('./game');

$( () => {
  let game = new Game();
  let $el = $(".ttt");
  new View(game, $el);
});
