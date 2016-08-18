const MoveError = require("./moveError");
var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  $('li').on("click", event => {
    let $square = $(event.currentTarget);
    let pos = $square.data("pos");
    let posArr = pos.split(",").map(el => parseInt(el));
    try {
      this.game.playMove(posArr);
      this.makeMove($square);
    } catch (e) {
      if (e instanceof MoveError) {
        alert(e.msg);
      }
    }
  });
};

View.prototype.makeMove = function ($square) {
  if (this.game.currentPlayer === "o") {
    $square.html("O");
    $square.addClass("o");
  } else {
    $square.html("X");
    $square.addClass("x");
  }

  if (this.game.isOver()) {
    let $won = $("<h3>").html(`Hey "${this.game.currentPlayer}", you win!`);
    this.$el.append($won);
    $("li").filter(`.${this.game.currentPlayer}`).addClass("winner");
    $("li").filter(`.${this.game.winner()}`).addClass("loser");
    // if (this.game.currentPlayer === "o") {
    //   let $winnersMarks = $("li").filter(".mark-O").addClass("winner");
    //   let $losersMarks = $("li").filter(".mark-X").addClass("loser");
    // } else {
    //   let $winnersMarks = $("li").filter(".mark-X").addClass("winner");
    //   let $losersMarks = $("li").filter(".mark-O").addClass("loser");
    // }
  }
};

View.prototype.setupBoard = function () {
  for(let i = 0; i < 3; i++) {
    let $row = $("<ul>").addClass("group");
    for(let j = 0; j < 3; j++) {
      let $square = $("<li>").attr("data-pos", [i, j]);
      $row.append($square);
    }
    this.$el.append($row);
  }
};

module.exports = View;
