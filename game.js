// function addimage1() {
//   var RoFo = document.createElement("RoFo");
//   RoFo.src = 'unnamed.png';
//   document.body.appendChild(RoFo);
// }

var game = {
  turn: "X",
  instruct: function(str) {
    $('caption').text(str);
  },
  begin: function() {
    // reset things! clear last game if there's a game to clear
    $('body').off('click');
    $('td')
      .text('')
      .removeClass('taken')
      .removeClass('win')
    // set up event handler for taking a turn
    $('td').click(function() {
      $(this)
        .text(game.turn) // put an X or O in the cell
        .addClass('taken') // display as taken
        .off('click'); // don't allow clicking on it again
      // check to see if the game's over
      var game_over = false;
      if ($('td.taken').length > 4) { // no one can win until the 5th turn
        if (game.win_on_turn($(this).parent().index(), $(this).index())) {
          game.instruct("Game over, " + game.turn + " won. Click to play again.");
          game_over = true;
        }
        else if ($('td.taken').length == 9) {
          game.instruct("Game over: tie game. Click to play again.");
          game_over = true;
        }
      }
      if (game_over) {
        $('body').removeClass('game-on');
        $('td').off('click'); // shouldn't be able to take turns any more
        setTimeout(function(){$('body').click(game.begin)}, 1); // wait 1 millisecond, otherwise gets triggered by the click that made the turn
      }
      else {
        game.turn = game.turn == "X" ? "O" : "X"; // alternate whose turn it is
        game.turn_begin();
      }
    });
  // begin
  $('body').addClass('game-on');
  game.turn_begin();
  },
  turn_begin: function() {
    game.instruct( "Your turn, " + game.turn );
  },
  cell: function(row, col) {
    return $('tr:eq(' + row + ') td:eq(' + col + ')');
  },
  check_n_show_win: function(a, b, c) {
      a = game.cell(a[0], a[1]);
      b = game.cell(b[0], b[1]);
      c = game.cell(c[0], c[1]);
      if (a.text() && a.text()==b.text() && b.text()==c.text()) {
        a.addClass('win');
        b.addClass('win');
        c.addClass('win');
        return true;
      }
      return false;
  },
  win_on_turn: function(row, col) { // check if there is a win after a new turn at [row, col]
    if (game.check_n_show_win([row, 0], [row, 1], [row, 2])) { // check the row
      return true;
    }
    if (game.check_n_show_win([0, col], [1, col], [2, col])) { // check the column
      return true;
    }
    if (game.check_n_show_win([2,0], [1,1], [0,2])) { // check / diagonal
      return true;
    }
    return game.check_n_show_win([0,0], [1,1], [2,2]); // check \ diagonal
  }
};

$(function(){
  game.begin();
});